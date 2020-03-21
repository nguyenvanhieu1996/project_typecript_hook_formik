import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { useParams } from "react-router-dom";
import { getUser } from '../../api/Users'
import { UserEntity } from '../../models/Users'
interface IDetailProps {
}

const Detail: React.FC<IDetailProps> = (props) => {
  const { Meta } = Card;
  let { id } = useParams();

  const [user, setUser] = useState<UserEntity>({
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    avatar: ''
  })

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const result = await getUser(Number(id))
    if (!result) return false
    setUser(result)
  }

  return (
    <>
      <div>Detail User {user.id}</div>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
      >
        <Meta title={user.first_name + ' ' + user.last_name} description={user.email} />
      </Card>
    </>
  );
};

export default Detail;
