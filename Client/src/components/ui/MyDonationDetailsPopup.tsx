import { ReactNode, useEffect, useRef, useState } from "react";
import "../../styles/Animation.style.css";
import { LuDollarSign } from "react-icons/lu";
import { GoDownload } from "react-icons/go";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { useGetMyDonationDetailsQuery } from "../../redux/features/donation/donation.api";
import { FaSpinner } from "react-icons/fa";
import useLoadingBounce from "../../hooks/useLoadingBounce";

interface IProps {
  children: ReactNode;
  id: string;
}

const MyDonationDetailsPopup = ({ children, id }: IProps) => {
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

  const { data, isLoading } = useGetMyDonationDetailsQuery(id);

  const bouncedLoading = useLoadingBounce(isLoading, 300);
  const donation = data?.data;
  const isAnonymously = donation?.isAnonymously
 const donorPersonalInfo =  donation?.donorPersonalInfo
  

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
            {bouncedLoading ? (
              <div className="h-[60vh] flex justify-center items-center">
                <span className="text-primary animate-spin text-4xl">
                  <FaSpinner />
                </span>
              </div>
            ) : donation ? (
              <div>
                <h1 className="text-2xl font-medium text-gray-800">Donation</h1>
                <div ref={receiptRef} className="mt-5 p-2">
                  <div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-4xl text-black ">
                        <LuDollarSign />
                      </span>

                      <h1 className="text-5xl font-medium text-center text-primary ">
                        {donation?.amount}
                        <span className="text-3xl text-gray-600">/USD</span>
                      </h1>
                    </div>

                    <div className="mt-3 space-y-3 font-secondary">
                      <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                        <span className="text-gray-950 font-semibold">Id:</span>
                        <span className="text-primary font-semibold">{donation?._id}</span>
                      </p>

                      <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                        <span className="text-gray-950 font-semibold">Is Asymonyes:</span>
                        <span>{donation?.isAnonymously ? "Yes" : "No"}</span>
                      </p>
                      <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                        <span className="text-gray-950 font-semibold">Created At:</span>
                        <span>
                          {new Date(donation?.createdAt).toDateString()}-
                          {new Date(donation?.createdAt).toLocaleTimeString()}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h2 className="text-gray-900 font-medium text-xl">Campaign Information:</h2>

                    <div className="mt-3 space-y-3 font-secondary">
                      <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                        <span className="text-gray-950 font-semibold">Name:</span>
                        <span>{donation?.campaign.title}</span>
                      </p>

                      <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                        <span className="text-gray-950 font-semibold">Category:</span>
                        <span>{donation?.campaign.category}</span>
                      </p>
                    </div>
                  </div>
    {!isAnonymously && donorPersonalInfo && Object.values(donorPersonalInfo).length && (
              <div className="mt-4">
                <h3 className=" md:text-xl text-lg font-medium">Personal Information:</h3>
                <div className="mt-3 space-y-3 font-secondary">
                  <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                    <span className="text-gray-950 font-semibold">Full Name:</span>
                    <span>{donorPersonalInfo.fullName}</span>
                  </p>
                  <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                    <span className="text-gray-950 font-semibold">Email Address:</span>
                    <span>{donorPersonalInfo.email || "N/A"}</span>
                  </p>
                  <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                    <span className="text-gray-950 font-semibold">Phone Number:</span>
                    <span>{donorPersonalInfo.phoneNumber || "N/A"}</span>
                  </p>
                  <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                    <span className="text-gray-950 font-semibold">Address:</span>
                    <span>{Object.values(donorPersonalInfo.address).slice(0,-1).join(",")}</span>
                  </p>
                </div>
              </div>
            )}
                  <div className="mt-4">
                    <h2 className="text-gray-900 font-medium text-xl">Payment Information:</h2>
                    <div className="mt-3 space-y-3 font-secondary">
                      <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                        <span className="text-gray-950 font-semibold">Transaction Id:</span>
                        <span className="text-primary font-medium">
                          {donation?.payment.transactionId}
                        </span>
                      </p>
                      <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                        <span className="text-gray-950 font-semibold">Amount:</span>
                        <span className=" text-blue-700 font-medium">
                          {donation?.payment.amount}
                        </span>
                      </p>
                      <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                        <span className="text-gray-950 font-semibold">Currency:</span>
                        <span className="px-2 py-1 rounded-md text-purple-600  font-medium">
                          USD
                        </span>
                      </p>
                      <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                        <span className="text-gray-950 font-semibold">Method:</span>
                        <span className="px-2 py-1 rounded-md  bg-blue-100 text-blue-700 font-medium">
                          {donation?.payment.method}
                        </span>
                      </p>

                      <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                        <span className="text-gray-950 font-semibold">Status:</span>
                        <span className="text-primary font-medium">Success</span>
                      </p>
                      <p className=" font-medium space-x-2 md:text-[1rem] text-sm">
                        <span className="text-gray-950 font-semibold">Created At:</span>
                        <span>
                          {new Date(donation?.payment.createdAt).toDateString()}-
                          {new Date().toLocaleTimeString()}
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
            ) : (
              <div>
                <h1>Not found</h1>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MyDonationDetailsPopup;
