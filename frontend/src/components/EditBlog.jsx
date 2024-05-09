import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "./Editor";
import "react-quill/dist/quill.snow.css";
import { BACKEND_URL } from "./Home";
import axios from "axios";

export function EditBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(BACKEND_URL + "/api/v1/blogs/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then(async (e) => {
      const res = e.data;
      setTitle(res.title);
      setDescription(res.description);
      setContent(res.content);
    });
  }, []);

  async function HandleEdit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const imageFile = data.get("image");

    data.set("title", title);
    data.set("description", description);
    data.set("content", content);
    data.set("image", imageFile);

    const res = await axios.put(BACKEND_URL + "/api/v1/blogs/" + id, {
      body: data,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(res);
    if (res.ok) {
      navigate("/");
    } else {
      alert("Wrong Credentials");
    }
  }

  return (
    <>
      <div className="container mx-auto px-4 py-4 md:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto w-full">
          <div className="">
            <form
              className="grid grid-cols-2 md:gap-x-12 lg:gap-x-16 xl:gap-x-20 gap-y-4 md:gap-y-6 auto-rows-max px-4 "
              onSubmit={HandleEdit}
            >
              <div className="col-span-2 md:col-span-1">
                <label
                  htmlFor="title"
                  className="block tracking-wider text-sm sm:text-md md:text-lg font-medium leading-3 text-gray-900"
                >
                  Title
                </label>
                <div className="mt-2 md:mt-3">
                  <input
                    id="title"
                    name="title"
                    value={title}
                    type="text"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    className="block sm:h-10 text-md w-full px-4 rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400   focus:ring-1 focus:ring-inset focus:ring-blue-700 "
                  />
                </div>
              </div>

              <div className="col-span-2 md:col-span-1">
                <label
                  htmlFor="description"
                  className="block tracking-wider text-sm sm:text-md md:text-lg font-medium leading-3 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2 md:mt-3">
                  <input
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    required
                    className="block text-md px-4 sm:h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400  focus:ring-1 focus:ring-inset focus:ring-blue-700 "
                  />
                </div>
              </div>

              <div className="col-span-2">
                <input
                  id="imageFile"
                  name="image"
                  type="file"
                  required
                  className="block w-full ring-1 ring-gray-400 rounded-md text-sm md:text-md text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-md file:font-semibold
                  file:bg-violet-100 file:text-blue-700
                  hover:file:bg-violet-200
                "
                />
              </div>

              <Editor value={content} onChange={setContent} />

              <div className="col-span-2 place-self-end">
                <button
                  type="submit"
                  className="flex rounded-md bg-blue-700 px-4 py-2 text-md font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                >
                  Edit Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
