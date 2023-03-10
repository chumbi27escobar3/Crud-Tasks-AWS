import { useEffect } from 'react';
import { Modal, Form, Input, message } from "antd";
import { Note } from "../../interfaces/Interfaces";

const { TextArea } = Input;

interface NoteModalProps {
  open: boolean;
  edit?: Note;
  handleClose: () => void;
  handleOk: (note: Note) => void;
}

const NoteModal: React.FC<NoteModalProps> = ({ open, handleClose, handleOk, edit }) => {

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(edit);
  }, [edit, form]);

  const close = () => {
    form.resetFields();
    handleClose();
  }

  return (
    <Modal
      open={open}
      title={edit?"Update your note":"Create a new note"}
      okText={edit?"Update":"Create"}
      cancelText="Cancel"
      onCancel={close}
      onOk={() => {
        form
          .validateFields()
          .then((values: Note) => {
            form.resetFields();
            handleOk(values);
            close();
          })
          .catch((info) => {
            message.error('Validate Failed: ' + info.reason);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
        <Form.Item
          name="nameTask"
          label="Title"
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default NoteModal;