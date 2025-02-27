import React from "react";
import RecentDonations from "./RecentDonations";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const CampaignDetails = () => {
  return (
    <section>
      <div className="md:space-y-8 space-y-6">
        <div className="flex items-center justify-end gap-2">
          <p className="text-gray-700">Share :</p>
          <span className=" md:text-2xl text-xl p-2 bg-gray-50 rounded-full">
            <FaFacebook />
          </span>
          <span className="text-2xl p-2 bg-gray-50 rounded-full">
            <FaInstagram />
          </span>
          <span className="text-2xl p-2 bg-gray-50 rounded-full">
            <FaTwitter />
          </span>
        </div>
        <h1 className="md:text-5xl text-3xl  font-secondary font-bold text-gray-950">
          Provide nutrious Food for Those in need
        </h1>
        <div className="space-y-2">
          <div className="bg-green-50 rounded-full">
            <div className=" md:h-2 h-1 bg-primary rounded-full w-[70%]"></div>
          </div>
          <div className="flex items-center justify-between font-secondary">
            <p className="text-sm text-gray-700 font-medium">
              <span className="font-semibold text-black text-[1rem]">$7894</span> raised
            </p>
            <p className="text-sm text-gray-600 font-semibold">$1000</p>
          </div>
        </div>
        <img src="/images/banner.jpg" alt="" className="rounded-lg" />
        <p className="text-gray-800 font-secondary md:text-[1rem] text-[0.9rem]">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam repellendus et doloribus
          repudiandae doloremque assumenda numquam, eos asperiores dolores, enim laborum. Sit, ullam
          cupiditate? Facilis, sed quis, nesciunt est accusamus cumque eius fuga error sunt
          exercitationem deleniti molestiae laboriosam, hic ratione ipsum dolores. Delectus ducimus
          ea nesciunt minus inventore quas placeat. Assumenda voluptas quam aliquam optio quaerat
          blanditiis consectetur voluptatibus ratione sapiente ut cupiditate totam possimus et, esse
          laboriosam quo error velit autem obcaecati magnam, illum laborum incidunt! Iste est
          officiis placeat culpa impedit error ex ipsum ut in quo facilis quae nemo illo, commodi
          optio alias iusto, harum minus corporis rerum non, consequatur sed expedita perspiciatis?
          Asperiores delectus deleniti et temporibus maiores dolores nulla sequi exercitationem
          nostrum ducimus nisi, reprehenderit reiciendis necessitatibus atque consequatur repellat
          nemo. Enim, suscipit voluptatibus? Qui doloribus aspernatur totam ducimus maiores iure ab
          expedita! Laboriosam praesentium nihil aperiam eos quam minus error unde et. Iusto
          consequuntur distinctio quo veniam sapiente, repudiandae adipisci numquam dignissimos vel
          sequi. Amet voluptatum provident enim ipsa, illo mollitia iusto nostrum veniam quo
          distinctio similique tempora nesciunt quidem tenetur et eum expedita. Obcaecati deserunt
          ea, repudiandae maxime voluptatum nihil molestiae quas excepturi mollitia vero harum illo
          provident eum enim. Illum illo consectetur eligendi libero delectus, dignissimos,
          molestiae ea unde nulla natus hic saepe quibusdam enim minima nemo eaque rerum facilis
          sequi laudantium quo est numquam harum. Laborum ex doloremque, voluptatum recusandae
          facere eum placeat pariatur enim aliquid mollitia suscipit earum consectetur. Molestias,
          dolores. Labore temporibus excepturi, a, sint nisi reiciendis ab esse ullam quod ad ipsa,
          quis sed natus accusantium ratione nihil! Expedita, numquam? Cumque praesentium odio
          doloribus vero suscipit voluptas sit, quae minima quidem illo ut voluptate, ex incidunt
          neque, odit eum mollitia assumenda dignissimos officia ratione facere alias cum eaque
          recusandae. Delectus in a debitis ipsam architecto libero exercitationem impedit cum
          numquam eius rem, laborum
        </p>
        <div className="flex items-center flex-wrap gap-3 md:text-[1rem] text-sm">
          <Link to="" className=" font-medium text-gray-700 border-b hover:text-primary">
            Other Ways to give
          </Link>
          <Link to="" className=" font-medium text-gray-700 border-b hover:text-primary">
            Support
          </Link>
          <Link to="" className=" font-medium text-gray-700 border-b hover:text-primary">
            Call-in donations
          </Link>
        </div>
      </div>
      <RecentDonations />
    </section>
  );
};

export default CampaignDetails;
