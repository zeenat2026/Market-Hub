import {
  Box,
  Container,
  Typography,
  Stack,
  Link,
  Divider,
} from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "footer.main",
        color: "white",
        mt: 5,
      }}
    >
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={4}
          sx={{justifyContent:'space-between'}}
        >
          {/* Brand */}
          <Box>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ color: "brand.main", mb: 1 }}
            >
              MarketHub
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "grey.400", mt: 1, maxWidth: 300 }}
            >
              Your daily source for the latest news, trends and updates.
            </Typography>
          </Box>

          {/* Quick Links */}
          <Box>
            <Typography fontWeight="bold" mb={1.5}>
              Quick Links
            </Typography>

            <Stack spacing={1}>
              <Link href="/" color="inherit" underline="hover">
                Home
              </Link>

              <Link href="/business" color="inherit" underline="hover">
                Business
              </Link>

              <Link href="/technology" color="inherit" underline="hover">
                Technology
              </Link>

              <Link href="/sports" color="inherit" underline="hover">
                Sports
              </Link>
            </Stack>
          </Box>

          {/* About */}
          <Box>
            <Typography fontWeight="bold" mb={1.5}>
              MarketHub
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "grey.400", maxWidth: 250 }}
            >
              Stay informed with reliable and interesting stories from
              around the world.
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 3, borderColor: "grey.700" }} />

        <Typography
          variant="body2"
          align="center"
          sx={{ color: "grey.500" }}
        >
          © {new Date().getFullYear()} MarketHub. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;