import { Link } from "react-router-dom";
import { Modal, Form, Button, Header, FormField } from "semantic-ui-react";
import { useState } from "react";

const CreateGroup = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      onOpen={() => setModalOpen(true)}
      trigger={<Link> Create G </Link>}
    > 
      <Modal.Header>Create Group</Modal.Header>
      <Modal.Content>
      <form >

  <div >
    <label>Group Name </label>
    <input type="text" name="last-name" placeholder="Last Name"/>
  </div>
  <div >
    <div class="ui checkbox">
      <input type="checkbox" tabindex="0" class="hidden"/>
      <label>I agree to the Terms and Conditions</label>
    </div>
  </div>
  <button  type="submit">Submit</button>
</form>
      </Modal.Content>
      <Modal.Actions></Modal.Actions>
    </Modal>
  );
};

export default CreateGroup;
