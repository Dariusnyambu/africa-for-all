export interface ProgramDetail {
  slug: string;
  title: string;
  icon: string;
  summary: string;
  heroImage: string;
  initiatives: { title: string; description: string }[];
}

export const PROGRAM_DETAILS: Record<string, ProgramDetail> = {
  education: {
    slug: "education",
    title: "Education",
    icon: "GraduationCap",
    summary:
      "Community learning centers, teacher training, girl child education, and adult literacy programs.",
    heroImage: "https://images.unsplash.com/photo-1473649085228-583485e6e4d7?w=1600&q=80",
    initiatives: [
      {
        title: "Community Learning Centers",
        description:
          "We build and support schools and learning hubs across urban and rural areas, providing after-school programs, tutoring, and internet access focused on literacy and numeracy for children, youth, and adults.",
      },
      {
        title: "Teacher Training & Capacity Building",
        description:
          "Workshops focused on student-centered learning and modern educational methods, equipping educators with the resources to deliver quality instruction.",
      },
      {
        title: "Girl Child Education",
        description:
          "Scholarship programs and community awareness campaigns that promote girls' enrolment in school, while addressing barriers like early marriage, domestic work, and safety concerns.",
      },
      {
        title: "Adult Literacy Programs",
        description:
          "Education programs to increase basic literacy, with a focus on refugee communities including Oromo, Ethiopian, and Somali populations, delivered in partnership with local leaders.",
      },
    ],
  },
  healthcare: {
    slug: "healthcare",
    title: "Healthcare",
    icon: "Stethoscope",
    summary: "Mobile clinics, maternal care, disease prevention, and mental wellness.",
    heroImage: "https://images.unsplash.com/photo-1631217871099-88310a909a32?w=1600&q=80",
    initiatives: [
      {
        title: "Mobile Health Clinics",
        description:
          "Clinics that travel to urban and rural areas offering basic health screenings, vaccinations, and health education, in partnership with local healthcare providers.",
      },
      {
        title: "Maternal & Child Health",
        description:
          "Reducing maternal and infant mortality through prenatal care education, postnatal follow-up, nutrition support, and training for local birth attendants.",
      },
      {
        title: "Mental Health Awareness",
        description:
          "Campaigns to reduce stigma, alongside counseling and support groups — especially for youth and women.",
      },
      {
        title: "Disease Prevention",
        description:
          "Awareness and prevention programs for HIV/AIDS, malaria, and tuberculosis, including distribution of mosquito nets and sanitization supplies.",
      },
    ],
  },
  "economic-empowerment": {
    slug: "economic-empowerment",
    title: "Economic Empowerment",
    icon: "BriefcaseBusiness",
    summary: "Skills training, entrepreneurship, and microfinance.",
    heroImage: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=1600&q=80",
    initiatives: [
      {
        title: "Vocational Training",
        description:
          "Training centers offering courses in carpentry, tailoring, agriculture, and IT — giving youth and women the skills to improve employability and entrepreneurial potential.",
      },
      {
        title: "Microfinance & Small Business Support",
        description:
          "Microloans and financial literacy training for small businesses, paired with mentorship programs linking entrepreneurs to successful local business owners.",
      },
      {
        title: "Sustainable Agriculture",
        description:
          "Training in crop rotation, organic farming, and climate-resilient techniques, plus cooperative-building to improve market access and fair pricing.",
      },
    ],
  },
  "women-youth": {
    slug: "women-youth",
    title: "Women & Youth",
    icon: "Users",
    summary: "Leadership, equality, and advocacy.",
    heroImage: "https://images.unsplash.com/photo-1732305830025-34ec2db2b25c?w=1600&q=80",
    initiatives: [
      {
        title: "Women's Rights & Advocacy",
        description:
          "Campaigns against gender-based violence, FGM, and child marriage, with legal aid and counseling for survivors.",
      },
      {
        title: "Women's Leadership Training",
        description:
          "Leadership development workshops enabling women to take on decision-making roles, alongside business support and networking opportunities.",
      },
      {
        title: "Youth Vocational & Leadership Programs",
        description:
          "Skill-building and leadership development designed for personal growth and community impact.",
      },
    ],
  },
  "climate-action": {
    slug: "climate-action",
    title: "Climate Action",
    icon: "Leaf",
    summary: "Renewable energy, reforestation, and recycling.",
    heroImage: "https://images.unsplash.com/photo-1741874299706-2b8e16839aaa?w=1600&q=80",
    initiatives: [
      {
        title: "Community-Led Climate Action",
        description:
          "Education on climate change impacts, paired with reforestation and conservation projects in deforestation-affected areas.",
      },
      {
        title: "Renewable Energy Projects",
        description:
          "Partnerships with solar companies bringing affordable, sustainable energy to off-grid communities, with technician training included.",
      },
      {
        title: "Waste Management & Recycling",
        description:
          "Waste collection and recycling initiatives developed in partnership with local governments and environmental agencies.",
      },
    ],
  },
};
