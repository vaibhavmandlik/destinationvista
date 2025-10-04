import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Typography,
  Slide,
  Box,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

import PackagesList from "../packages/PackagesList";
import DestinationCategory from "../destinations/DestinationCategory";
import BackToTop from "../backtotop/BackToTop";
import HomeRegistration from "../registration/HomeRegistration";
import HomeBlogSection from "../blogs/HomeBlogSection";
import CarouselComponent from "../carousel/Carousel";

// ✅ Slide-up transition
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Home: React.FC = () => {
  const [cookieDialogOpen, setCookieDialogOpen] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("cookiesAccepted");
    if (!hasAccepted) {
      setCookieDialogOpen(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setCookieDialogOpen(false);
  };

  const handleDeclineCookies = () => {
    setCookieDialogOpen(false);
  };

  return (
    <>
      {/* Sections */}
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

      {/* ✅ Elegant Bottom Cookie Banner */}
      <Dialog
        open={cookieDialogOpen}
        TransitionComponent={Transition}
        fullWidth
        maxWidth="xl"
        PaperProps={{
          sx: {
            position: "fixed",
            bottom: 0,
            m: 0,
            borderRadius: 0,
            background: "#f9f9f9",
            boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
          },
        }}
      >
        <DialogContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body1" sx={{ pr: 2 }}>
               We use cookies to improve your experience, show personalized
              content, and analyze traffic. By clicking "Accept", you agree to
              our cookie policy.
            </Typography>
            <DialogActions>
              <Button
                onClick={handleDeclineCookies}
                color="secondary"
                variant="outlined"
              >
                Decline
              </Button>
              <Button
                onClick={handleAcceptCookies}
                color="primary"
                variant="contained"
              >
                Accept
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Home;
