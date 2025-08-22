import React from "react";
import PackagesList from "../packages/PackagesList";
import DestinationCategory from "../destinations/DestinationCategory";
import BackToTop from "../backtotop/BackToTop";
import HomeRegistration from "../registration/HomeRegistration";
import HomeBlogSection from "../blogs/HomeBlogSection";
import CarouselComponent from "../carousel/Carousel";

const Home: React.FC = () => {
  return (
    <>
      {/* <DynamicHeader /> */}
      <CarouselComponent />
      <DestinationCategory />
      <PackagesList
        isShowHeader={false}
        isSearchBar={false}
        heading={"Perfect Tour Packages"}
        subheading={" Packages"}
        packages={[]}
        onDetailsBookNowClick={function (): void {
          throw new Error("Function not implemented.");
        }}
        onExploreMoreClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <HomeRegistration />
      <HomeBlogSection />
      <BackToTop />
    </>
  );
};

export default Home;
