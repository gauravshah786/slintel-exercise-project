// TODO: remove antd dependency
import { Modal } from 'antd';

const CustomModal = (props) => {
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