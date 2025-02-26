import Container from "../../container/Container";
import Heading from "../../ui/Heading";

const SuccessGallery = () => {
  const headingProps = {
    heading: "Our Gallery",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi possimus perspiciatis, iste repudiandae laboriosam non quae repellat.",
  };
  return (
    <section className="py-10">
      <Container>
        <Heading {...headingProps} />
        <section className="py-24 ">
          <div className="gallery">
            <div className="flex flex-col mb-10">
              <div className="grid md:grid-cols-12 gap-8 lg:mb-11 mb-7">
                <div className="md:col-span-4 md:h-[404px] h-[277px] w-full rounded-3xl">
                  <img
                    src="https://pagedone.io/asset/uploads/1713942989.png"
                    alt="Gallery image"
                    className="gallery-image object-cover rounded-3xl hover:grayscale transition-all duration-700 ease-in-out mx-auto lg:col-span-4 md:col-span-6 w-full h-full"
                  />
                </div>
                <div className="md:col-span-8 md:h-[404px] h-[277px] w-full rounded-3xl">
                  <img
                    src="https://pagedone.io/asset/uploads/1713943004.png"
                    alt="Gallery image"
                    className="gallery-image object-cover rounded-3xl hover:grayscale transition-all duration-700 ease-in-out mx-auto lg:col-span-8 md:col-span-6 w-full h-full"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
                <div className="h-[277px] w-full rounded-3xl">
                  <img
                    src="https://pagedone.io/asset/uploads/1713943024.png"
                    alt="Gallery image"
                    className="gallery-image object-cover rounded-3xl hover:grayscale transition-all duration-700 ease-in-out mx-auto w-full h-full"
                  />
                </div>
                <div className="h-[277px] w-full rounded-3xl">
                  <img
                    src="https://pagedone.io/asset/uploads/1713943039.png"
                    alt="Gallery image"
                    className="gallery-image object-cover rounded-3xl hover:grayscale transition-all duration-700 ease-in-out mx-auto w-full h-full"
                  />
                </div>
                <div className="h-[277px] w-full rounded-3xl">
                  <img
                    src="https://pagedone.io/asset/uploads/1713943054.png"
                    alt="Gallery image"
                    className="gallery-image object-cover rounded-3xl hover:grayscale transition-all duration-700 ease-in-out mx-auto w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lightbox" id="lightbox">
            <span className="close" id="close">
              &times;
            </span>
            <img src="" alt="" className="lightbox-image" id="lightbox-image" />
          </div>
        </section>
      </Container>
    </section>
  );
};

export default SuccessGallery;
