import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
const About = () => {
    return (
        <div className='aboutBox'>
            <h1>About Us</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati totam rem ratione expedita voluptate excepturi sed vero quo perspiciatis dicta aspernatur explicabo, rerum dolore asperiores, necessitatibus Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque, quis quasi, ab nesciunt laborum adipisci distinctio fugit, dolores ut dolore expedita debitis repudiandae officiis excepturi labore nostrum eum recusandae totam odio ad natus! Eligendi rerum ipsum ipsa doloremque quos iusto, est explicabo. Veniam sapiente, minus similique, dicta unde minima est expedita iste laboriosam incidunt quo repellendus corporis ipsum tempore modi Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error voluptatum mollitia facilis eaque doloremque sed amet dolorum eum quaerat vitae, earum in magni quo tempore inventore, commodi vel esse accusantium recusandae et sunt? Officia voluptates at rerum, modi necessitatibus beatae reiciendis sint ipsum eum odit odio fugit magni nobis nostrum ipsa, autem totam quia provident et. Deserunt quibusdam, consequuntur possimus mollitia similique corrupti eligendi neque delectus, ad aperiam veniam cum? Possimus, alias! Veritatis magnam quia ea cumque mollitia fugit enim! deserunt. Labore reiciendis harum quam facilis explicabo, beatae impedit cum. sit debitis ab, corporis est pariatur velit nisi deserunt a quaerat. Iusto, porro fuga.</p>
            <Link to={'/'}><Button>Back To Home</Button></Link>
        </div>
    )
}

export default About
