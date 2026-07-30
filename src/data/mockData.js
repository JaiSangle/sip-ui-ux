export const currentUser = {
    id: "1",
    name: "Arjun Mehta",
    avatar: "https://ui-avatars.com/api/?name=Arjun+Mehta&background=0A66C2&color=fff&size=200",
    headline: "Final Year CSE Student | Web Developer | Open to Opportunities",
    location: "Mumbai, Maharashtra",
    email: "arjun.mehta@email.com",
    connections: 487,
    followers: 512,
    about: "Passionate computer science student with hands-on experience in full-stack development. Currently seeking internship opportunities in product-based companies. Love building things that solve real problems.",
    profileViews: 234,
    experience: [
        { id: 1, role: "Frontend Developer Intern", company: "TechCorp Solutions", logo: "https://ui-avatars.com/api/?name=TechCorp&background=0A66C2&color=fff", duration: "Jun 2023 - Aug 2023", description: "Built responsive UI components using React and Tailwind CSS. Improved page load time by 30%." },
        { id: 2, role: "Web Developer", company: "Freelance", logo: "https://ui-avatars.com/api/?name=FL&background=666&color=fff", duration: "Jan 2023 - Present", description: "Developed websites for 5+ local businesses." }
    ],
    education: [
        { id: 1, school: "Mumbai University", degree: "B.Tech", field: "Computer Science", year: "2021-2025", grade: "8.7 CGPA", logo: "https://ui-avatars.com/api/?name=MU&background=1B1F23&color=fff" }
    ],
    skills: ["React.js", "JavaScript", "Python", "Node.js", "Tailwind CSS", "Git", "SQL", "Figma"],
    posts: ["1", "2"]
}

export const users = [
    {
        id: "2",
        name: "Priya Sharma",
        avatar: "https://ui-avatars.com/api/?name=Priya+Sharma&background=7C3AED&color=fff&size=200",
        headline: "Data Science Student | ML Enthusiast | IIT Bombay",
        location: "Delhi, India",
        connections: 312,
        about: "Exploring machine learning and data analytics. Research intern at IIT Bombay.",
        experience: [{ id: 1, role: "Research Intern", company: "IIT Bombay", logo: "https://ui-avatars.com/api/?name=IIT&background=7C3AED&color=fff", duration: "May 2023 - Jul 2023", description: "Worked on NLP models for sentiment analysis." }],
        education: [{ id: 1, school: "IIT Bombay", degree: "B.Tech", field: "Data Science", year: "2020-2024", grade: "9.1 CGPA", logo: "https://ui-avatars.com/api/?name=IIT&background=1B1F23&color=fff" }],
        skills: ["Python", "Machine Learning", "TensorFlow", "SQL", "Tableau"],
        isConnected: true,
        mutualConnections: 12
    },
    {
        id: "3",
        name: "Rohit Verma",
        avatar: "https://ui-avatars.com/api/?name=Rohit+Verma&background=059669&color=fff&size=200",
        headline: "MBA Student | Finance & Consulting | IIM Ahmedabad",
        location: "Ahmedabad, Gujarat",
        connections: 645,
        about: "MBA student passionate about strategy consulting and investment banking.",
        experience: [{ id: 1, role: "Summer Analyst", company: "McKinsey & Co", logo: "https://ui-avatars.com/api/?name=MC&background=059669&color=fff", duration: "Apr 2023 - Jun 2023", description: "Worked on digital transformation projects." }],
        education: [{ id: 1, school: "IIM Ahmedabad", degree: "MBA", field: "Finance", year: "2022-2024", grade: "Top 10%", logo: "https://ui-avatars.com/api/?name=IIM&background=1B1F23&color=fff" }],
        skills: ["Financial Modeling", "Excel", "PowerPoint", "Strategy", "Consulting"],
        isConnected: true,
        mutualConnections: 8
    },
    {
        id: "4",
        name: "Sneha Patel",
        avatar: "https://ui-avatars.com/api/?name=Sneha+Patel&background=DC2626&color=fff&size=200",
        headline: "UI/UX Designer | Product Design | NID Graduate",
        location: "Ahmedabad, Gujarat",
        connections: 289,
        about: "Crafting user-centered digital experiences. NID graduate with 2 years of design experience.",
        experience: [{ id: 1, role: "Product Design Intern", company: "Zomato", logo: "https://ui-avatars.com/api/?name=ZO&background=DC2626&color=fff", duration: "Mar 2023 - Jun 2023", description: "Redesigned onboarding flow increasing user retention by 25%." }],
        education: [{ id: 1, school: "National Institute of Design", degree: "B.Des", field: "UX Design", year: "2019-2023", grade: "Distinction", logo: "https://ui-avatars.com/api/?name=NID&background=1B1F23&color=fff" }],
        skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "Wireframing"],
        isConnected: false,
        mutualConnections: 5
    },
    {
        id: "5",
        name: "Karan Singh",
        avatar: "https://ui-avatars.com/api/?name=Karan+Singh&background=D97706&color=fff&size=200",
        headline: "Full Stack Developer | SDE Intern at Google | BITS Pilani",
        location: "Hyderabad, Telangana",
        connections: 521,
        about: "Building scalable systems. SDE intern at Google. Love competitive programming.",
        experience: [{ id: 1, role: "SDE Intern", company: "Google", logo: "https://ui-avatars.com/api/?name=G&background=D97706&color=fff", duration: "May 2023 - Aug 2023", description: "Worked on backend infrastructure for Google Maps." }],
        education: [{ id: 1, school: "BITS Pilani", degree: "B.E.", field: "Computer Science", year: "2020-2024", grade: "9.3 CGPA", logo: "https://ui-avatars.com/api/?name=BITS&background=1B1F23&color=fff" }],
        skills: ["Java", "Spring Boot", "Kubernetes", "React", "System Design"],
        isConnected: false,
        mutualConnections: 15
    },
    {
        id: "6",
        name: "Ananya Roy",
        avatar: "https://ui-avatars.com/api/?name=Ananya+Roy&background=0891B2&color=fff&size=200",
        headline: "Marketing Student | Brand Strategy | Delhi University",
        location: "Delhi, India",
        connections: 198,
        about: "Passionate about brand building and digital marketing strategies.",
        experience: [{ id: 1, role: "Marketing Intern", company: "Unilever", logo: "https://ui-avatars.com/api/?name=UL&background=0891B2&color=fff", duration: "Jun 2023 - Aug 2023", description: "Led social media campaigns reaching 100K+ users." }],
        education: [{ id: 1, school: "Delhi University", degree: "BBA", field: "Marketing", year: "2021-2024", grade: "7.8 CGPA", logo: "https://ui-avatars.com/api/?name=DU&background=1B1F23&color=fff" }],
        skills: ["Digital Marketing", "SEO", "Content Strategy", "Google Analytics", "Social Media"],
        isConnected: false,
        mutualConnections: 3
    },
    {
        id: "7",
        name: "Vikram Nair",
        avatar: "https://ui-avatars.com/api/?name=Vikram+Nair&background=4F46E5&color=fff&size=200",
        headline: "Cybersecurity Student | Ethical Hacker | NIT Trichy",
        location: "Chennai, Tamil Nadu",
        connections: 267,
        about: "Cybersecurity enthusiast with expertise in penetration testing and ethical hacking.",
        experience: [{ id: 1, role: "Security Intern", company: "IBM", logo: "https://ui-avatars.com/api/?name=IBM&background=4F46E5&color=fff", duration: "Jul 2023 - Sep 2023", description: "Conducted security audits and vulnerability assessments." }],
        education: [{ id: 1, school: "NIT Trichy", degree: "B.Tech", field: "Information Security", year: "2020-2024", grade: "8.5 CGPA", logo: "https://ui-avatars.com/api/?name=NIT&background=1B1F23&color=fff" }],
        skills: ["Cybersecurity", "Python", "Linux", "Network Security", "Penetration Testing"],
        isConnected: false,
        mutualConnections: 7
    }
]

export const posts = [
    {
        id: "1",
        userId: "1",
        userName: "Arjun Mehta",
        userAvatar: "https://ui-avatars.com/api/?name=Arjun+Mehta&background=0A66C2&color=fff",
        userHeadline: "Final Year CSE Student | Web Developer",
        content: "Excited to share that I just completed my internship at TechCorp Solutions! 🎉 Learned so much about real-world software development. Key takeaways:\n\n✅ Code reviews are gold\n✅ Communication matters as much as code\n✅ Always ask questions\n\nThank you to my amazing mentors! #Internship #WebDev #Learning",
        likes: 234,
        shares: 18,
        timestamp: "2024-01-15T10:30:00Z",
        image: null,
        comments: [
            { id: "c1", userName: "Priya Sharma", userAvatar: "https://ui-avatars.com/api/?name=Priya+Sharma&background=7C3AED&color=fff", content: "Congratulations Arjun! Well deserved! 🎊", timestamp: "2024-01-15T11:00:00Z" },
            { id: "c2", userName: "Karan Singh", userAvatar: "https://ui-avatars.com/api/?name=Karan+Singh&background=D97706&color=fff", content: "Amazing achievement! Keep it up bro 💪", timestamp: "2024-01-15T12:00:00Z" }
        ],
        liked: false
    },
    {
        id: "2",
        userId: "2",
        userName: "Priya Sharma",
        userAvatar: "https://ui-avatars.com/api/?name=Priya+Sharma&background=7C3AED&color=fff",
        userHeadline: "Data Science Student | IIT Bombay",
        content: "Just published my first research paper on Natural Language Processing! 📄 It covers sentiment analysis using transformer models. The journey was challenging but incredibly rewarding.\n\nLink in comments! #MachineLearning #NLP #Research",
        likes: 456,
        shares: 67,
        timestamp: "2024-01-14T09:00:00Z",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&auto=format&fit=crop",
        comments: [
            { id: "c3", userName: "Arjun Mehta", userAvatar: "https://ui-avatars.com/api/?name=Arjun+Mehta&background=0A66C2&color=fff", content: "This is incredible Priya! Must read 🔥", timestamp: "2024-01-14T10:00:00Z" },
            { id: "c4", userName: "Vikram Nair", userAvatar: "https://ui-avatars.com/api/?name=Vikram+Nair&background=4F46E5&color=fff", content: "Congratulations on the publication!", timestamp: "2024-01-14T11:00:00Z" }
        ],
        liked: false
    },
    {
        id: "3",
        userId: "5",
        userName: "Karan Singh",
        userAvatar: "https://ui-avatars.com/api/?name=Karan+Singh&background=D97706&color=fff",
        userHeadline: "SDE Intern at Google | BITS Pilani",
        content: "Top 5 DSA tips that helped me crack Google SDE Intern interview:\n\n1️⃣ Master arrays, trees, and graphs first\n2️⃣ Practice 2-3 problems daily, not 10\n3️⃣ Explain your thought process out loud\n4️⃣ Learn time complexity deeply\n5️⃣ Mock interviews are non-negotiable\n\nFeel free to DM for interview prep resources! #Google #DSA #SWE #Placement",
        likes: 892,
        shares: 234,
        timestamp: "2024-01-13T08:00:00Z",
        image: null,
        comments: [
            { id: "c5", userName: "Arjun Mehta", userAvatar: "https://ui-avatars.com/api/?name=Arjun+Mehta&background=0A66C2&color=fff", content: "This is super helpful! Thanks Karan 🙏", timestamp: "2024-01-13T09:00:00Z" }
        ],
        liked: false
    },
    {
        id: "4",
        userId: "4",
        userName: "Sneha Patel",
        userAvatar: "https://ui-avatars.com/api/?name=Sneha+Patel&background=DC2626&color=fff",
        userHeadline: "UI/UX Designer | NID Graduate",
        content: "Design principle that changed how I work: Design for the user, not for yourself. 🎨\n\nI used to design what I thought looked cool. Now I design based on user research and testing. The results are night and day!\n\nWhat's your favorite design principle? #UXDesign #ProductDesign #DesignThinking",
        likes: 567,
        shares: 89,
        timestamp: "2024-01-12T14:00:00Z",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop",
        comments: [
            { id: "c6", userName: "Ananya Roy", userAvatar: "https://ui-avatars.com/api/?name=Ananya+Roy&background=0891B2&color=fff", content: "So true! User-first always wins 💯", timestamp: "2024-01-12T15:00:00Z" }
        ],
        liked: false
    },
    {
        id: "5",
        userId: "3",
        userName: "Rohit Verma",
        userAvatar: "https://ui-avatars.com/api/?name=Rohit+Verma&background=059669&color=fff",
        userHeadline: "MBA Student | IIM Ahmedabad",
        content: "Completed my McKinsey internship last week. Here's what consulting actually looks like:\n\n📊 80% of time: Gathering and analyzing data\n📑 15% of time: Building presentations\n🤝 5% of time: Client meetings\n\nExpectations vs reality are very different. But the learning is unmatched! #Consulting #McKinsey #MBA",
        likes: 1203,
        shares: 445,
        timestamp: "2024-01-11T16:00:00Z",
        image: null,
        comments: [
            { id: "c7", userName: "Priya Sharma", userAvatar: "https://ui-avatars.com/api/?name=Priya+Sharma&background=7C3AED&color=fff", content: "Very insightful post Rohit!", timestamp: "2024-01-11T17:00:00Z" },
            { id: "c8", userName: "Karan Singh", userAvatar: "https://ui-avatars.com/api/?name=Karan+Singh&background=D97706&color=fff", content: "Reality check 😄 Thanks for sharing!", timestamp: "2024-01-11T18:00:00Z" }
        ],
        liked: false
    },
    {
        id: "6",
        userId: "6",
        userName: "Ananya Roy",
        userAvatar: "https://ui-avatars.com/api/?name=Ananya+Roy&background=0891B2&color=fff",
        userHeadline: "Marketing Student | Delhi University",
        content: "Ran my first solo Instagram campaign for a local brand last month. Results 📈\n\n• Reach: 0 → 45,000\n• Followers: 200 → 2,800\n• Sales: +340%\n\nThe key? Consistent posting + engaging content + right hashtags. Marketing is science + creativity! #DigitalMarketing #Growth #Campaign",
        likes: 678,
        shares: 123,
        timestamp: "2024-01-10T11:00:00Z",
        image: null,
        comments: [
            { id: "c9", userName: "Sneha Patel", userAvatar: "https://ui-avatars.com/api/?name=Sneha+Patel&background=DC2626&color=fff", content: "These numbers are insane! Great work 🔥", timestamp: "2024-01-10T12:00:00Z" }
        ],
        liked: false
    }
]

export const jobs = [
    { id: "1", company: "Google", logo: "https://ui-avatars.com/api/?name=Google&background=4285F4&color=fff", title: "Software Engineer Intern", location: "Hyderabad, India", type: "Internship", salary: "₹80,000/month", description: "Join Google's engineering team for a 3-month internship. Work on real products used by billions of users. You'll collaborate with senior engineers on cutting-edge technology projects.", requirements: ["B.Tech/M.Tech in CS or related field", "Strong DSA skills", "Experience with one programming language", "Problem-solving mindset"], postedDate: "2 days ago", applicants: 1240, saved: false },
    { id: "2", company: "Microsoft", logo: "https://ui-avatars.com/api/?name=Microsoft&background=00A4EF&color=fff", title: "Product Manager Intern", location: "Bangalore, India", type: "Internship", salary: "₹75,000/month", description: "Work with Microsoft's product team to define product strategy and roadmap. Collaborate with engineering, design and marketing teams.", requirements: ["MBA or final year engineering student", "Strong analytical skills", "Excellent communication", "Prior PM or engineering experience preferred"], postedDate: "3 days ago", applicants: 876, saved: false },
    { id: "3", company: "Flipkart", logo: "https://ui-avatars.com/api/?name=Flipkart&background=F7A600&color=fff", title: "Data Analyst", location: "Bangalore, India", type: "Full-time", salary: "₹12-18 LPA", description: "Analyze large datasets to drive business decisions. Build dashboards and reports for leadership teams.", requirements: ["1-2 years experience", "Python/R proficiency", "SQL expertise", "Tableau or PowerBI experience"], postedDate: "1 week ago", applicants: 432, saved: false },
    { id: "4", company: "Zomato", logo: "https://ui-avatars.com/api/?name=Zomato&background=E23744&color=fff", title: "UI/UX Design Intern", location: "Gurgaon, India (Hybrid)", type: "Internship", salary: "₹25,000/month", description: "Design beautiful and intuitive user interfaces for Zomato's mobile and web applications.", requirements: ["Figma expertise", "Portfolio of 3+ projects", "Understanding of UX principles", "Final year design student"], postedDate: "5 days ago", applicants: 567, saved: false },
    { id: "5", company: "Razorpay", logo: "https://ui-avatars.com/api/?name=Razorpay&background=2EB5C9&color=fff", title: "Frontend Developer", location: "Bangalore, India", type: "Full-time", salary: "₹15-22 LPA", description: "Build and maintain Razorpay's payment infrastructure frontend. Work with React and modern web technologies.", requirements: ["2+ years React experience", "TypeScript proficiency", "Performance optimization knowledge", "REST API experience"], postedDate: "1 week ago", applicants: 321, saved: false },
    { id: "6", company: "Swiggy", logo: "https://ui-avatars.com/api/?name=Swiggy&background=FC8019&color=fff", title: "Backend Engineer Intern", location: "Bangalore, India (Remote)", type: "Internship", salary: "₹40,000/month", description: "Work on Swiggy's backend microservices handling millions of food orders daily.", requirements: ["CS undergraduate student", "Knowledge of Java or Go", "Database fundamentals", "System design basics"], postedDate: "4 days ago", applicants: 789, saved: false },
    { id: "7", company: "KPMG", logo: "https://ui-avatars.com/api/?name=KPMG&background=00338D&color=fff", title: "Business Analyst Intern", location: "Mumbai, India", type: "Internship", salary: "₹35,000/month", description: "Support KPMG's consulting team in delivering business transformation projects for Fortune 500 clients.", requirements: ["MBA/BBA student", "Excel and PowerPoint expertise", "Strong analytical mindset", "Good communication skills"], postedDate: "6 days ago", applicants: 654, saved: false },
    { id: "8", company: "Paytm", logo: "https://ui-avatars.com/api/?name=Paytm&background=002970&color=fff", title: "Machine Learning Engineer", location: "Noida, India", type: "Full-time", salary: "₹18-28 LPA", description: "Build and deploy ML models for Paytm's fraud detection and recommendation systems.", requirements: ["M.Tech or PhD in CS/ML", "TensorFlow/PyTorch experience", "Production ML experience", "Python expertise"], postedDate: "2 weeks ago", applicants: 245, saved: false }
]

export const notifications = [
    { id: "1", type: "connection_request", message: "Priya Sharma wants to connect with you", time: "2 minutes ago", read: false, avatar: "https://ui-avatars.com/api/?name=Priya+Sharma&background=7C3AED&color=fff", userId: "2" },
    { id: "2", type: "post_like", message: "Karan Singh and 45 others liked your post", time: "1 hour ago", read: false, avatar: "https://ui-avatars.com/api/?name=Karan+Singh&background=D97706&color=fff", userId: "5" },
    { id: "3", type: "job_alert", message: "New job matching your profile: Frontend Developer at Razorpay", time: "3 hours ago", read: false, avatar: "https://ui-avatars.com/api/?name=Razorpay&background=2EB5C9&color=fff", userId: null },
    { id: "4", type: "comment", message: "Sneha Patel commented on your post: 'Great insights!'", time: "5 hours ago", read: true, avatar: "https://ui-avatars.com/api/?name=Sneha+Patel&background=DC2626&color=fff", userId: "4" },
    { id: "5", type: "connection_request", message: "Rohit Verma wants to connect with you", time: "1 day ago", read: true, avatar: "https://ui-avatars.com/api/?name=Rohit+Verma&background=059669&color=fff", userId: "3" },
    { id: "6", type: "job_alert", message: "Google SDE Intern applications closing in 2 days", time: "1 day ago", read: true, avatar: "https://ui-avatars.com/api/?name=Google&background=4285F4&color=fff", userId: null },
    { id: "7", type: "mention", message: "Ananya Roy mentioned you in a comment", time: "2 days ago", read: true, avatar: "https://ui-avatars.com/api/?name=Ananya+Roy&background=0891B2&color=fff", userId: "6" },
    { id: "8", type: "post_like", message: "Vikram Nair liked your profile", time: "3 days ago", read: true, avatar: "https://ui-avatars.com/api/?name=Vikram+Nair&background=4F46E5&color=fff", userId: "7" }
]

export const conversations = [
    {
        id: "1",
        userId: "2",
        name: "Priya Sharma",
        avatar: "https://ui-avatars.com/api/?name=Priya+Sharma&background=7C3AED&color=fff",
        headline: "Data Science Student | IIT Bombay",
        lastMessage: "Thanks for the referral link!",
        time: "2m",
        unread: 2,
        online: true,
        messages: [
            { id: "m1", senderId: "2", content: "Hey Arjun! How are you?", time: "10:00 AM" },
            { id: "m2", senderId: "1", content: "Doing great Priya! How's your research going?", time: "10:02 AM" },
            { id: "m3", senderId: "2", content: "It's going really well! Just submitted my paper", time: "10:05 AM" },
            { id: "m4", senderId: "1", content: "That's amazing! Congratulations 🎉", time: "10:06 AM" },
            { id: "m5", senderId: "2", content: "Could you share the Razorpay referral link?", time: "10:10 AM" },
            { id: "m6", senderId: "2", content: "Thanks for the referral link!", time: "10:15 AM" }
        ]
    },
    {
        id: "2",
        userId: "5",
        name: "Karan Singh",
        avatar: "https://ui-avatars.com/api/?name=Karan+Singh&background=D97706&color=fff",
        headline: "SDE Intern at Google | BITS Pilani",
        lastMessage: "Let's catch up this weekend",
        time: "1h",
        unread: 0,
        online: true,
        messages: [
            { id: "m1", senderId: "5", content: "Bro are you preparing for placements?", time: "Yesterday" },
            { id: "m2", senderId: "1", content: "Yes! Doing DSA daily now", time: "Yesterday" },
            { id: "m3", senderId: "5", content: "Good! Let me know if you need any help", time: "Yesterday" },
            { id: "m4", senderId: "1", content: "Sure thanks man!", time: "Yesterday" },
            { id: "m5", senderId: "5", content: "Let's catch up this weekend", time: "1h ago" }
        ]
    },
    {
        id: "3",
        userId: "4",
        name: "Sneha Patel",
        avatar: "https://ui-avatars.com/api/?name=Sneha+Patel&background=DC2626&color=fff",
        headline: "UI/UX Designer | NID Graduate",
        lastMessage: "I'll review your portfolio tomorrow",
        time: "3h",
        unread: 1,
        online: false,
        messages: [
            { id: "m1", senderId: "1", content: "Hi Sneha! I saw your design work, it's amazing!", time: "Yesterday" },
            { id: "m2", senderId: "4", content: "Thank you so much Arjun!", time: "Yesterday" },
            { id: "m3", senderId: "1", content: "Could you review my portfolio?", time: "3h ago" },
            { id: "m4", senderId: "4", content: "I'll review your portfolio tomorrow", time: "3h ago" }
        ]
    }
]
