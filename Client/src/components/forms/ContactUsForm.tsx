import React from "react";

const ContactUsForm = () => {
  return (
    <form action="" className="bg-white p-5 rounded-md">
      <h1 className="text-2xl text-gray-900 font-semibold rounded-lg">Send a Message</h1>
      <div className="mt-5 space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="px-2 py-4 w-full bg-gray-100 placeholder:font-secondary placeholder:font-medium   outline-secondary"
        />
        <input
          type="text"
          placeholder="Email"
          className="px-2 py-4 w-full bg-gray-100 placeholder:font-secondary placeholder:font-medium   outline-secondary"
        />
        <textarea
          placeholder="message"
          name="message"
          className="w-full py-3 px-2 h-52 resize-none border-2 border-gray-700/15 rounded-md placeholder:font-secondary font-medium outline-secondary"
        />
      </div>
      <div className="mt-5 space-y-2">
        <p className="text-gray-700 font-secondary  ">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime sit a quaerat quasi
          doloremque consequatur tenetur laudantium{" "}
        </p>
        <button className="w-full py-3 bg-primary font-medium text-white rounded-md">Submit</button>
      </div>
    </form>
  );
};

export default ContactUsForm;
