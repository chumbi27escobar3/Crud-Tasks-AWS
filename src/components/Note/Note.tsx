import React from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card } from 'antd';

const { Meta } = Card;

interface NoteProps {
  id: string;
  title: string;
  description: string; 
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

const Note: React.FC<NoteProps> = ( { id, title, description, handleEdit, handleDelete } ) => {

  return (
    <Card
      actions={[
        <EditOutlined key="edit" onClick={() => handleEdit(id)}/>,
        <DeleteOutlined key="delete" onClick={() => handleDelete(id)}/>,
      ]}
    >
      <Meta
        title={title}
        description={description}
      />
    </Card>
  )
}

export default Note;
