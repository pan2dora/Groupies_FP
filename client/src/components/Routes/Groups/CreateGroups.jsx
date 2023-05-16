import { Modal, Form, Button, Header } from "semantic-ui-

const CreateGroups = () =>{

    return(
        <div className="App">
      <Modal as={Form} trigger={<Button>Basic Modal</Button>} size="small">
        <Header content="Form Modal" />
        <Modal.Content>
          <Form.Input fluid name="title" label="Title" placeholder="Title" />
          <Form.Input fluid name="author" label="Author" placeholder="Author" />
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red">
            No
          </Button>
          <Button type="submit" color="green">
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
    )
}

export default CreateGroups;