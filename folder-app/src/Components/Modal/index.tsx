// TODO: remove antd dependency
import { Modal } from 'antd';
import React from 'react';

import { ModalConfig } from '../PageHeader';

interface CustomModalProps {
  config: ModalConfig
}

const CustomModal = (props: CustomModalProps) => {
  const { config } = props;
  console.log(config);
  return ( 
    <Modal
      visible={true}
      title={config.title}
      onOk={config.handleOk} 
      onCancel={config.handleCancel}
      okText={config.okText}>
      {config.content}
    </Modal>
  );
};

export default CustomModal;