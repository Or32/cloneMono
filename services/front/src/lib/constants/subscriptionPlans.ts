interface SubscriptionPlan {
    title: string;
    monthlyPrice: number;
    cta: string;
    isPopular: boolean;
    features: string[];
}

export const subscriptionPlans: SubscriptionPlan[] = [
    {
        title: "Stream",
        monthlyPrice: 9,
        cta: "Get Started",
        isPopular: false,
        features: [
            "Up to 1 project member",
            "10K monthly tokens",
            "SDK & CLI access",
            "Integration support",
        ]
    },
    {
        title: "Flood",
        monthlyPrice: 19,
        cta: "Get Started",
        isPopular: true,
        features: [
            "Up to 5 project members",
            "50K monthly tokens",
            "SDK & CLI access",
            "Integration support",
            "Advanced Analytics",
            "Advanced security features",
        ]
    },
    {
        title: "Tsunami",
        monthlyPrice: 49,
        cta: "Get Started",
        isPopular: false,
        features: [
            "Up to 10 project members",
            "1M monthly tokens",
            "SDK & CLI access",
            "Integration support",
            "Advanced Analytics",
            "Advanced security features",
            "SSO (Single Sign-On)",
            "Custom Domain"
        ]
    },
]