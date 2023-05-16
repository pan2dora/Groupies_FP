import { Button, Form, Input} from "semantic-ui-react"
import React, { useState } from "react";


const GroupPostForm = () =>{

  const [addPost, setAddPost] = useState()
//create social media post form 
   
const handleAddPost = () =>{



}



return(
  <>
<Form>
<Input
type = "text"
required
placeholder = "What's on your mind?"
OnChange = {handleAddPost}
>
  



</Input>

<Button>Post</Button>
</Form>



          </>
    )
    }

export default GroupPostForm; 