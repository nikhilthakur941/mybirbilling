"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";


// ===================================
// minutes → best readable unit
// ===================================
function splitDuration(minutes: number) {
  if (minutes % 1440 === 0)
    return { value: minutes / 1440, unit: "days" };

  if (minutes % 60 === 0)
    return { value: minutes / 60, unit: "hours" };

  return { value: minutes, unit: "minutes" };
}

export default function EditPackage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // ✅ DETAILS STATE
  const [details, setDetails] = useState<any[]>([]);

  // ===================================
  // load package
  // ===================================
  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/admin/packages/${id}`);
      const json = await res.json();
      setData(json);

      // ✅ preload details
      setDetails(json.details || []);
    };

    if (id) load();
  }, [id]);

  if (!data)
    return <div className="p-8 text-black">Loading...</div>;

  const durationParts = splitDuration(data.duration);

  // ===================================
  // DETAILS HANDLERS
  // ===================================

  const addSection = () => {
    setDetails([...details, { title: "", points: [""] }]);
  };

  const removeSection = (i: number) => {
    setDetails(details.filter((_, idx) => idx !== i));
  };

  const updateTitle = (i: number, value: string) => {
    const copy = [...details];
    copy[i].title = value;
    setDetails(copy);
  };

  const addPoint = (i: number) => {
    const copy = [...details];
    copy[i].points.push("");
    setDetails(copy);
  };

  const updatePoint = (i: number, j: number, value: string) => {
    const copy = [...details];
    copy[i].points[j] = value;
    setDetails(copy);
  };

  const removePoint = (i: number, j: number) => {
    const copy = [...details];
    copy[i].points.splice(j, 1);
    setDetails(copy);
  };

  // ===================================
  // submit form
  // ===================================
  const submit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData(e.target);

    // duration → minutes
    const value = Number(fd.get("durationValue"));
    const unit = fd.get("durationUnit");

    let minutes = value;
    if (unit === "hours") minutes *= 60;
    if (unit === "days") minutes *= 1440;

    fd.set("duration", String(minutes));

    // keep media
    const checks = e.target.querySelectorAll(
      'input[name="keepMedia"]:checked'
    );

    const keepIds = Array.from(checks).map((c: any) =>
      Number(c.value)
    );

    fd.append("keepMediaIds", JSON.stringify(keepIds));

    // ✅ SEND DETAILS
    fd.append("details", JSON.stringify(details));

    await fetch(`/api/admin/packages/${id}`, {
      method: "PUT",
      body: fd,
    });

    router.push("/admin/packages");
  };

  // ===================================
  // UI
  // ===================================
  return (
    <div className="min-h-screen bg-white flex justify-center p-6">
      <form
        onSubmit={submit}
        className="w-full max-w-3xl border rounded-xl shadow p-8 space-y-8"
      >
        <h1 className="text-2xl font-bold">✏️ Edit Package</h1>

        {/* NAME */}
        <input
          name="name"
          defaultValue={data.name}
          className="w-full border p-3 rounded"
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          defaultValue={data.description}
          className="w-full border p-3 rounded"
        />

        {/* DURATION + PRICE */}
        <div className="flex gap-4">
          <input
            name="durationValue"
            defaultValue={durationParts.value}
            className="border p-3"
          />
          <select
            name="durationUnit"
            defaultValue={durationParts.unit}
            className="border p-3"
          >
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
            <option value="days">Days</option>
          </select>

          <input
            name="price"
            defaultValue={data.price}
            className="border p-3"
          />
        </div>

        {/* ========================= */}
        {/* DETAILS SECTION */}
        {/* ========================= */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Package Details
          </h2>

          {details.map((section, i) => (
            <div key={i} className="border p-4 mb-4 rounded">
              {/* TITLE */}
              <input
                value={section.title}
                onChange={(e) =>
                  updateTitle(i, e.target.value)
                }
                placeholder="Section title"
                className="w-full border p-2 mb-3"
              />

              {/* POINTS */}
              {section.points.map((p: string, j: number) => (
                <div key={j} className="flex gap-2 mb-2">
                  <input
                    value={p}
                    onChange={(e) =>
                      updatePoint(i, j, e.target.value)
                    }
                    className="flex-1 border p-2"
                  />

                  <button
                    type="button"
                    onClick={() => removePoint(i, j)}
                    className="bg-red-500 text-white px-3"
                  >
                    X
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addPoint(i)}
                className="text-blue-600 text-sm"
              >
                + Add Point
              </button>

              <br />

              <button
                type="button"
                onClick={() => removeSection(i)}
                className="text-red-600 mt-2 text-sm"
              >
                Remove Section
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addSection}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + Add Section
          </button>
        </div>

        {/* EXISTING MEDIA */}
        <div>
          {data.media?.map((m: any) => (
            <label key={m.id} className="block">
              <input
                type="checkbox"
                name="keepMedia"
                value={m.id}
                defaultChecked
              />

              {m.type === "IMAGE" ? (
                <img src={m.url} className="w-24" />
              ) : (
                <video src={m.url} className="w-24" />
              )}
            </label>
          ))}
        </div>

        {/* NEW MEDIA */}
        <input type="file" name="files" multiple />

        {/* BUTTON */}
        <button
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}