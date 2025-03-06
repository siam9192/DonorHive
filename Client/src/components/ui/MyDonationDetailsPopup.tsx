import { ReactNode, useEffect, useRef, useState } from "react";
import "../../styles/Animation.style.css";
import { LuDollarSign } from "react-icons/lu";
import { GoDownload } from "react-icons/go";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import DonationReceipt from "./DonationReceipt";

interface IProps {
  children: ReactNode;
}

const MyDonationDetailsPopup = ({ children }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  const downloadPdf = async () => {
    const element = receiptRef.current;

    if (!element) return;
    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("document.pdf");
    });
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>{children}</button>
      {isOpen ? (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 w-full h-full bg-gray-900/75 flex justify-center items-center p-2 z-50 animate-popup-scale"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="lg:w-1/3 md:w-10/12 w-full max-h-[80vh]  overflow-y-auto no-scrollbar  bg-white rounded-md md:p-10 p-5  "
          >
            <div>
              <h1 className="text-2xl font-medium text-gray-800">Donation</h1>
              <div className="mt-8">
                <div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-4xl text-black ">
                      <LuDollarSign />
                    </span>

                    <h1 className="text-5xl font-medium text-center text-primary ">
                      120<span className="text-3xl text-gray-600">/USD</span>
                    </h1>
                  </div>

                  <div className="mt-3 space-y-3 font-secondary">
                    <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                      <span className="text-gray-950 font-semibold">Id:</span>
                      <span className="text-primary font-semibold">34485656436545</span>
                    </p>

                    <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                      <span className="text-gray-950 font-semibold">Is Asymonyes:</span>
                      <span>No</span>
                    </p>
                    <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                      <span className="text-gray-950 font-semibold">Created At:</span>
                      <span>
                        {new Date().toDateString()}-{new Date().toLocaleTimeString()}
                      </span>
                    </p>
                    <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                      <span className="text-gray-950 font-semibold">Updated At:</span>
                      <span>
                        {new Date().toDateString()}-{new Date().toLocaleTimeString()}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <h2 className="text-gray-900 font-medium text-xl">Campaign Information:</h2>

                  <div className="mt-3 space-y-3 font-secondary">
                    <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                      <span className="text-gray-950 font-semibold">Name:</span>
                      <span>Education For Everyone</span>
                    </p>

                    <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                      <span className="text-gray-950 font-semibold">Category:</span>
                      <span>Food</span>
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <h2 className="text-gray-900 font-medium text-xl">Donor Information:</h2>

                  <div className="mt-3 space-y-3 font-secondary">
                    <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                      <span className="text-gray-950 font-semibold">Full Name:</span>
                      <span>John Doe</span>
                    </p>
                    <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                      <span className="text-gray-950 font-semibold">Email Address:</span>
                      <span>johndoe@mail.com</span>
                    </p>
                    <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                      <span className="text-gray-950 font-semibold">Phone Number:</span>
                      <span>+98785655</span>
                    </p>
                    <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                      <span className="text-gray-950 font-semibold">Address:</span>
                      <span>123 Belicon,New York,Bangladesh</span>
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <h2 className="text-gray-900 font-medium text-xl">Payment Information:</h2>
                  <div className="mt-3 space-y-3 font-secondary">
                    <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                      <span className="text-gray-950 font-semibold">Transaction Id:</span>
                      <span className="text-primary font-medium">R576753F873KS</span>
                    </p>
                    <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                      <span className="text-gray-950 font-semibold">Amount:</span>
                      <span className=" text-blue-700 font-medium">120</span>
                    </p>
                    <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                      <span className="text-gray-950 font-semibold">Currency:</span>
                      <span className="px-2 py-1 rounded-md text-purple-600  font-medium">USD</span>
                    </p>
                    <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                      <span className="text-gray-950 font-semibold">Method:</span>
                      <span className="px-2 py-1 rounded-md  bg-blue-100 text-blue-700 font-medium">
                        Paypal
                      </span>
                    </p>

                    <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                      <span className="text-gray-950 font-semibold">Status:</span>
                      <span className="text-primary font-medium">Success</span>
                    </p>
                    <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                      <span className="text-gray-950 font-semibold">Created At:</span>
                      <span>
                        {new Date().toDateString()}-{new Date().toLocaleTimeString()}
                      </span>
                    </p>
                    <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                      <span className="text-gray-950 font-semibold">Updated At:</span>
                      <span>
                        {new Date().toDateString()}-{new Date().toLocaleTimeString()}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-end">
                <button
                  onClick={downloadPdf}
                  className="px-6 hover:bg-gray-100 py-3 border-2 border-gray-800/15 rounded-md flex items-center gap-2"
                >
                  <span className="text-2xl ">
                    <GoDownload />
                  </span>
                  <span>Download Receipt</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MyDonationDetailsPopup;
