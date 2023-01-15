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
        return getJson.topics[topicName].subTopic; 
    }

    const [topic, setTopic] = useState(getKeysFromTopics(GetTopicsJson())[0])
    const [subTopic, setSubTopic] = useState(getSubtopics(getKeysFromTopics(GetTopicsJson())[0]))
    const [loading, setLoading] = useState(false);
    const [generatedText, setGeneratedText] = useState('')
    const [showAlert, setShowAlert] = useState(false);
    const [showIcon, setShowIcon] = useState(false);
    const [tooltipTitle, setTooltipTitle] = useState("Copy To Clipboard");

    const handleIcon = (text)=> {
        let totalNumOfWords = text.split('').length;
        let totalTime = totalNumOfWords * 19;
        setTimeout(setShowIconToTrue, totalTime)
    }

    const setShowIconToTrue = ()=> {
        setShowIcon(true);
    }

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
                    setShowIcon(false)
                    setLoading(false)
                    setTooltipTitle('Copy To Clipboard')
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
    const sliceTheInitialSpaces = (text)=> {
        handleIcon(text);
        return text.slice(1);
    }

    const handleCopyClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setTooltipTitle("Copied");
    }
 
    return(
        <> 
        <h3 style={{'marginTop':'20px', 'fontSize':'2rem', 'fontWeight':'bold', 'textAlign':'center'}}>Blog Generator Using OpenAi Api</h3>
        <div className='d-flex flex-row bd-highlight mb-3 justify-content-center'>
         <div>
                <Form.Label style={{'marginTop':'70px'}} htmlFor="topic">Select topic</Form.Label>
                <Form.Select disabled={!!loading}  onChange={(e)=> setTopic(e.target.value)} value={topic} aria-label="Default select example">
                {availableKeys.map((topicKey, index)=> (
                    <option id={index} selected value={topicKey}>{topicKey.toUpperCase()}</option>
                    ))}
                </Form.Select>
         </div>

         <div style={{'marginLeft':'5%'}}>
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
            <div className='container' style={{'marginTop':'60px', 'marginBottom':'30px'}}>
            <Card style={{'marginTop':'20px', 'marginBottom':'10px'}}>
             <Card.Body style={{'whiteSpace': 'break-spaces'}}>
                <Typewriter
                words={[sliceTheInitialSpaces(generatedText)]}
                cursor
                loop={1}
                cursorStyle='_'
                typeSpeed={10}
                deleteSpeed={983243729847290} 
                isType={(count)=> handleIcon(count, generatedText)}
                />
             </Card.Body>
            </Card>
            
            {showIcon ? <> <Button variant='warning' data-toggle="tooltip" data-placement="top" title={tooltipTitle} onClick={()=> handleCopyClipboard(generatedText)}>{<FaCopy size={20} color='black'/>}</Button> 
            <Button style={{'marginLeft':'20px'}} variant='success' onClick={()=> {handleData()}}><MdRefresh size={23} color='white'/></Button> </> : null}
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