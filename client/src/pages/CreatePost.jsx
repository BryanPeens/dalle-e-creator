import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(
          "https://dall-e-creator.onrender.com/api/v1/dalle",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: form.prompt }),
          }
        );

        const data = await response.json();

        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await fetch(
          "https://dall-e-creator.onrender.com/api/v1/post",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          }
        );
        await response.json();
        navigate("/");
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a prompt and generate an image");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="text-center mt-4">
        <h1 className="font-extrabold text-[#222328] text-4xl mb-2">
          Create Your Masterpiece
        </h1>
        <p className="mt-2 text-[#666e75] text-lg max-w-[500px] mx-auto">
          Unleash DALL-E AI to craft captivating, visually stunning images that ignite the imagination. 
          Share these remarkable creations with the community, fostering a collective appreciation for the 
          limitless potential of AI-assisted artistry.
        </p>
      </div>
      <form className="mt-8 mx-auto max-w-md" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <FormField
              labelName="Your name"
              type="text"
              name="name"
              placeholder="John Doe"
              value={form.name}
              handleChange={handleChange}
            />
            <FormField
              labelName="Prompt"
              type="text"
              name="prompt"
              placeholder="an astronaut lounging in a tropical resort in space, vaporwave"
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
            />
            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={generateImage}
                className="text-white bg-green-700 font-medium rounded-full text-sm px-6 py-3"
              >
                {generatingImg ? "Generating..." : "Generate"}
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 h-80">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40 mx-auto"
              />
            )}
            {generatingImg && (
              <div className="absolute inset-0 z-10 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-10 text-center">
          <p className="mt-2 text-[#666e75] text-lg">
            Once you have created the image you want, you can share it with
            others in the community
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-lg px-8 py-4"
            disabled={loading}
          >
            {loading ? "Sharing..." : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;





// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import { preview } from "../assets";
// import { getRandomPrompt } from "../utils";
// import { FormField, Loader } from "../components";

// const CreatePost = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     prompt: "",
//     photo: "",
//   });

//   const [generatingImg, setGeneratingImg] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const generateImage = async () => {
//     if (form.prompt) {
//       try {
//         setGeneratingImg(true);
//         const response = await fetch(
//           "https://dall-e-creator.onrender.com/api/v1/dalle",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ prompt: form.prompt }),
//           }
//         );

//         const data = await response.json();

//         setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
//       } catch (error) {
//         alert(error);
//       } finally {
//         setGeneratingImg(false);
//       }
//     } else {
//       alert("Please enter a prompt");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (form.prompt && form.photo) {
//       setLoading(true);

//       try {
//         const response = await fetch(
//           "https://dall-e-creator.onrender.com/api/v1/post",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(form),
//           }
//         );
//         await response.json();
//         navigate("/");
//       } catch (error) {
//         alert(error);
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       alert("Please enter a prompt and generate an image");
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSurpriseMe = () => {
//     const randomPrompt = getRandomPrompt(form.prompt);
//     setForm({ ...form, prompt: randomPrompt });
//   };

//   return (
//     <section className="max-w-7xl mx-auto px-4">
//       <div className="text-center mt-4">
//         <h1 className="font-extrabold text-[#222328] text-4xl mb-2">
//           Create
//         </h1>
//         <p className="mt-2 text-[#666e75] text-lg max-w-[500px] mx-auto">
//           Create imaginative and visually stunning images through DALL-E AI and
//           share them with the community
//         </p>
//       </div>
//       <form className="mt-8 mx-auto max-w-md" onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//           <div>
//             <FormField
//               labelName="Your name"
//               type="text"
//               name="name"
//               placeholder="John Doe"
//               value={form.name}
//               handleChange={handleChange}
//             />
//             <FormField
//               labelName="Prompt"
//               type="text"
//               name="prompt"
//               placeholder="an astronaut lounging in a tropical resort in space, vaporwave"
//               value={form.prompt}
//               handleChange={handleChange}
//               isSurpriseMe
//               handleSurpriseMe={handleSurpriseMe}
//             />
//             <div className="mt-5 flex justify-center">
//               <button
//                 type="button"
//                 onClick={generateImage}
//                 className="text-white bg-green-700 font-medium rounded-full text-sm px-6 py-3"
//               >
//                 {generatingImg ? "Generating..." : "Generate"}
//               </button>
//             </div>
//           </div>
//           <div className="flex justify-center items-center bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 h-80">
//             {form.photo ? (
//               <img
//                 src={form.photo}
//                 alt={form.prompt}
//                 className="w-full h-full object-cover rounded-lg"
//               />
//             ) : (
//               <img
//                 src={preview}
//                 alt="preview"
//                 className="w-9/12 h-9/12 object-contain opacity-40 mx-auto"
//               />
//             )}
//             {generatingImg && (
//               <div className="absolute inset-0 z-10 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
//                 <Loader />
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="mt-10 text-center">
//           <p className="mt-2 text-[#666e75] text-lg">
//             Once you have created the image you want, you can share it with
//             others in the community
//           </p>
//           <button
//             type="submit"
//             className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-lg px-8 py-4"
//             disabled={loading}
//           >
//             {loading ? "Sharing..." : "Share with the community"}
//           </button>
//         </div>
//       </form>
//     </section>
//   );
// };

// export default CreatePost;
