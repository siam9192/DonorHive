import Container from "../../container/Container";
import Heading from "../../ui/Heading";

const SuccessGallery = () => {
  const headingProps = {
    heading: "Our Gallery",
    title:
      "Explore moments captured through our lens — a showcase of our work, events, and behind-the-scenes highlights",
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
                    src="https://imageio.forbes.com/specials-images/imageserve/67537b9e7becee190e7a138d/Three-Employees-packing-donation-boxes-for-holidays/0x0.jpg?format=jpg&crop=2027,1518,x114,y0,safe&width=960"
                    alt="Gallery image"
                    className="gallery-image object-cover rounded-3xl hover:grayscale transition-all duration-700 ease-in-out mx-auto lg:col-span-4 md:col-span-6 w-full h-full"
                  />
                </div>
                <div className="md:col-span-8 md:h-[404px] h-[277px] w-full rounded-3xl">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/022/355/739/non_2x/team-of-volunteers-smiling-and-holding-donations-boxes-in-outdoor-volunteers-putting-food-in-donation-boxes-social-worker-making-notes-charity-photo.jpg"
                    alt="Gallery image"
                    className="gallery-image object-cover rounded-3xl hover:grayscale transition-all duration-700 ease-in-out mx-auto lg:col-span-8 md:col-span-6 w-full h-full"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
                <div className="h-[277px] w-full rounded-3xl">
                  <img
                    src="https://img.freepik.com/premium-photo/group-diverse-people-as-donation-community-service-volunteer_53876-38815.jpg"
                    alt="Gallery image"
                    className="gallery-image object-cover rounded-3xl hover:grayscale transition-all duration-700 ease-in-out mx-auto w-full h-full"
                  />
                </div>
                <div className="h-[277px] w-full rounded-3xl">
                  <img
                    src="https://cdn.nwe.io/files/x/f2/32/fd3e55cce9b79d5a50ff7c1c7413.jpg"
                    alt="Gallery image"
                    className="gallery-image object-cover rounded-3xl hover:grayscale transition-all duration-700 ease-in-out mx-auto w-full h-full"
                  />
                </div>
                <div className="h-[277px] w-full rounded-3xl">
                  <img
                    src="https://www.mrpricefoundation.org/wp-content/uploads/2024/03/MRPG-donations-feature-blog_resized.jpg"
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
