export default function GetTopicsJson (){
    return {
        topics: {
             finance:{
                name:'Finance',
                subTopic: ['Stock Market Investing', 'Tax Harvesting', 'Tax Saving', 'Investing in Mutual Funds', 'Tax Saving through ELSS scheme']
            },
             health:{
                name:'Health',
                subTopic: ['Eat Healthy', 'Interminent Fasting', 'Drinking Water', 'Role Of Exercise on Health', 'Protein Shakes', 'What to avoid in your food', 'Bad Cholestrol and Its effects on body', 'Zumba and its benifits', 'Ayurveda and Its view on health', 'Different yogas for healthy body']
            },
             business:{
                name:'Business',
                subTopic: ['Cultivate Business Ideas', 'Bootstrapped Business', 'GST in Business', 'Entrepreneurship', 'Scale any business', 'Get your first funding', 'Pitch your business to investors', 'Scalable Branding For Your Business']
            },
             devops:{
                name:'Devops',
                subTopic: ['Kubernetes', 'Docker Swarm', 'Docker Networking', 'Containerize Mern Stack Application', 'Ansible', 'Jenkins', 'Various Tools For CI/CD pipelines', 'Infrastructure as a Code', 'Microservices and Its Architecture', 'Make Microservices using Nodejs']
            }
        }
    }
}