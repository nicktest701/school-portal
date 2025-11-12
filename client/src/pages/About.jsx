import { 
  Container, 
  Stack, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Grid,
  useTheme,
  useMediaQuery,
  Avatar,
  Chip,
  Button
} from "@mui/material";
import React from "react";
import {
  School,
  Analytics,
  Person,
  AutoAwesome,
  TrendingUp,
  Security,
  Group
} from "@mui/icons-material";

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    {
      icon: <School sx={{ fontSize: 40 }} />,
      title: "Student Management",
      description: "Comprehensive tools for managing student records, attendance, and schedules."
    },
    {
      icon: <Analytics sx={{ fontSize: 40 }} />,
      title: "Advanced Analytics",
      description: "Generate detailed reports and insights to drive informed decisions."
    },
    {
      icon: <Person sx={{ fontSize: 40 }} />,
      title: "User-Friendly Design",
      description: "Intuitive interface designed for educators with minimal learning curve."
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      title: "Efficiency Boost",
      description: "Automate routine tasks and focus on what matters most - education."
    }
  ];

  const stats = [
    { number: "50+", label: "Schools Trust Us" },
    { number: "10K+", label: "Students Managed" },
    { number: "96%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100svh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: 'white',
          py: 10,
          mb: 6
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Chip 
                label="Trusted by Educators Worldwide" 
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.2)', 
                  color: 'white', 
                  mb: 2,
                  backdropFilter: 'blur(10px)'
                }} 
              />
              <Typography 
                variant={isMobile ? "h3" : "h2"} 
                component="h1" 
                fontWeight="bold"
                gutterBottom
              >
                Transforming Education Management
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
                Empowering schools with intuitive, powerful tools to streamline operations and enhance learning outcomes.
              </Typography>
              <Button 
                variant="contained" 
                size="large"
                sx={{
                  bgcolor: 'white',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: 'grey.100',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                Get Started Today
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Avatar
                  sx={{
                    width: 200,
                    height: 200,
                    bgcolor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <Group sx={{ fontSize: 80, color: 'white' }} />
                </Avatar>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Stats Section */}
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Card 
                sx={{ 
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[8]
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h4" fontWeight="bold" color="primary">
                    {stat.number}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Features Section */}
        <Typography 
          variant="h4" 
          component="h2" 
          textAlign="center" 
          fontWeight="bold"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Why Choose FrebbyTech?
        </Typography>
        
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[8]
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ color: theme.palette.primary.main, mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Detailed Description */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h5" 
            component="h3" 
            fontWeight="bold"
            gutterBottom
            sx={{ mb: 4 }}
          >
            Our Mission
          </Typography>
          <Stack spacing={3}>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              Welcome to <strong>FrebbyTech School Portal</strong>, the comprehensive solution designed 
              to revolutionize how educational institutions operate. Our platform seamlessly integrates 
              all aspects of school management into one intuitive ecosystem.
            </Typography>
            
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              We understand the unique challenges faced by educators and administrators. That's why 
              we've built a system that not only handles the complexities of student information 
              management but also provides actionable insights through advanced analytics and 
              reporting tools.
            </Typography>

            <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 2 }}>
              <Typography variant="body1" sx={{ lineHeight: 1.8, fontStyle: 'italic' }}>
                "Our user-centric design philosophy ensures that every feature is crafted with 
                educators in mind. We believe technology should empower, not complicate."
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              By automating routine administrative tasks, we free up valuable time for educators 
              to focus on what truly matters: delivering exceptional education and nurturing 
              student growth. Join thousands of schools that have transformed their operations 
              with FrebbyTech.
            </Typography>
          </Stack>
        </Box>

        {/* CTA Section */}
        <Card
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`,
            border: `1px solid ${theme.palette.primary.main}20`,
            p: 4,
            textAlign: 'center'
          }}
        >
          <AutoAwesome sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Ready to Transform Your School?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, maxWidth: 600, mx: 'auto' }}>
            Join the educational revolution and experience the difference that intelligent 
            school management can make.
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            endIcon={<TrendingUp />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2
            }}
          >
            Start Your Journey Today
          </Button>
        </Card>
      </Container>
    </Box>
  );
};

export default About;