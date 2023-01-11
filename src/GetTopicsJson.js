export default function GetTopicsJson (){
    return {
        topics: {
             finance:{
                name:'Finance',
                subTopic: ['Stock Market Investing', 'Tax Harvesting', 'Tax Saving', 'Investing in Mutual Funds', 'Tax Saving through ELSS scheme']
            },
             health:{
                name:'Health',
                subTopic: ['Eat Healthy', 'Interminent Fasting', 'Drinking Water', 'Role Of Exercise on Health', 'Protein Shakes']
            },
             business:{
                name:'Business',
                subTopic: ['Cultivate Business Ideas', 'Bootstrapped Business', 'GST in Business', 'Entrepreneurship', 'Scale any business']
            },
             devops:{
                name:'Devops',
                subTopic: ['Kubernetes', 'Docker Swarm', 'Various Tools For CI/CD pipelines', 'Infrastructure as a Code', 'Microservices and Its Architecture']
            }
        }
    }
}