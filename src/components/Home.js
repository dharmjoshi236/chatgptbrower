import React, { useState } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner';
import GetTopicsJson from '../GetTopicsJson';
import {FaCopy} from 'react-icons/fa'
import {MdRefresh} from 'react-icons/md'
import { Typewriter } from 'react-simple-typewriter'
import Alert from 'react-bootstrap/Alert'

const Home = ()=> {

    const getKeysFromTopics = (topicArray) => {
        return Object.keys(topicArray.topics);
    }
    const getSubtopics = (topicName) => {
        const getJson = GetTopicsJson();
        console.log('getjson', getJson.topics[topicName].subTopic)
        return getJson.topics[topicName].subTopic; 
    }

    const [topic, setTopic] = useState(getKeysFromTopics(GetTopicsJson())[0])
    const [subTopic, setSubTopic] = useState(getSubtopics(getKeysFromTopics(GetTopicsJson())[0]))
    const [loading, setLoading] = useState(false);
    const [generatedText, setGeneratedText] = useState('')
    const [showAlert, setShowAlert] = useState(false);

    const handleData = async() => {
        if (topic && subTopic) {
            const data = {
                topic: topic,
                subTopic: subTopic
            }
            setLoading(true);
            try{
                const response = await axios.post('https://chatgpt-service.onrender.com/getchatgpt', data)
                if (response && response.status === 200) {
                    setGeneratedText(response.data.data);
                    setLoading(false)
                }
            } catch(e){
                setShowAlert(true);
                setLoading(false);
                console.log(e)
                return;
            }
        } else {
            console.log("not found the topic or subtoice")
        }
    }
    const availableKeys = getKeysFromTopics(GetTopicsJson());
    
    return(
        <> 
        <h3 style={{'marginTop':'20px', 'fontSize':'2rem', 'fontWeight':'bold', 'textAlign':'center'}}>Blog Generator Using OpenAi Api</h3>
        <div className='d-flex flex-row bd-highlight mb-3 justify-content-center'>
         <div>
                <Form.Label style={{'marginTop':'70px'}} htmlFor="topic">Select the topic</Form.Label>
                <Form.Select disabled={!!loading}  onChange={(e)=> setTopic(e.target.value)} value={topic} aria-label="Default select example">
                {availableKeys.map((topicKey, index)=> (
                    <option id={index} selected value={topicKey}>{topicKey.toUpperCase()}</option>
                    ))}
                </Form.Select>
         </div>

         <div style={{'marginLeft':'40px'}}>
                <Form.Label style={{'marginTop':'70px'}} htmlFor="topic">Select The Sub-Topic</Form.Label>
                <Form.Select disabled={!!loading} onChange={(e)=> setSubTopic(e.target.value)} value={subTopic} aria-label="Default select example">
                    {getSubtopics(topic).map((subTopicKey, index)=> (
                        <option id={index} selected value={subTopicKey}>{subTopicKey.toUpperCase()}</option>
                        ))}
                </Form.Select>    
         </div>
        </div>
         
            {topic && subTopic ?
            <>
            <div className=' d-flex justify-content-center mt-4 gap-2 w-100'>
            <Button variant="success" disabled={!!loading} onClick={()=> handleData()}>Generate Response</Button>
            </div>
            </> : null}
            
            {loading ? 
            <>
            <div className='container' style={{'marginTop':'100px', 'textAlign':'center'}}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            </div>
            </> : 
            <>
            {generatedText ? 
            <>
            <div className='container' style={{'marginTop':'60px'}}>
            <Button variant='warning' onClick={()=> navigator.clipboard.writeText(generatedText)}>{<FaCopy size={20} color='black'/>}</Button>
            <Button style={{'marginLeft':'20px'}} variant='success' onClick={()=> handleData()}><MdRefresh size={23} color='white'/></Button>
            <Card style={{'marginTop':'20px', 'marginBottom':'40px'}}>
             <Card.Body>
                <Typewriter
                words={[generatedText]}
                cursor
                loop={1}
                cursorStyle='_'
                typeSpeed={35}
                deleteSpeed={983243729847290} 
                />
             </Card.Body>
            </Card>
            </div>
            
            </> : null}
            </>}

            {showAlert ? 
            <>
            <div className='container' style={{'marginTop':'100px', 'textAlign':'center'}}>
            <Alert transition='fade' variant="danger" onClose={() => setShowAlert(false)} dismissible>
            <Alert.Heading>Something Went Wrong......</Alert.Heading>
                <p>
                Please Try After Sometime....
                </p>
            </Alert>
            </div>
            </> : null}
        </>
    )
}

export default Home;