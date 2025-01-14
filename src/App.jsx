// npm install react-router-dom
//manage the navigation in thee React application
import {
  useParams,
  useNavigate,
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

import { useState } from 'react'
import { useField } from './hooks'
// const Menu = () => {
//   const padding = {
//     paddingRight: 5
//   }
//   return (
//     <div>
//       <a href='#'  onClick = {toPage('anecdotes')} style={padding}>anecdotes</a>
//       <a href='#' onClick = {toPage('createNew')} style={padding}>create new</a>
//       <a href='#' onClick = {toPage('about')} style={padding}>about</a>
//     </div>
//   )
// }

import PropTypes from 'prop-types';

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      )}
    </ul>
  </div>
)

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(a => a.id === Number(id))
  return(
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <div>has {anecdote.votes} votes</div>
      <div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div>
    </div>
  )
}



const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is &quot;a story with a point.&quot;</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = ({addNew, setNotification}) => {
  // const [content, setContent] = useState('')
  // const [author, setAuthor] = useState('')
  // const [info, setInfo] = useState('')

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info:info.value,
      votes: 0
    })
    content.reset()
    author.reset()
    info.reset()
    setNotification(`A new anecdote "${content.value}" was created!`);
    setTimeout(() => 
    setNotification(''),5000);
    navigate('/')
    // Redirect to the anecdotes list

  }

  const handleReset = () =>{
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          {/* type = {Content.type} value={Content.value} onChange={Content.onChange} */}
          <input name='content' {...content} />
        </div>
        <div>
          author
          {/* type = {Author.type} value={Author.value} onChange={Author.onChange} */}
          <input name='author'  {...author} />
        </div>
        <div>
          url for more info
          {/* type = {Info.type} value={Info.value} onChange={Info.onChange} */}
          <input name='info'  {...info} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}
Anecdote.propTypes = {
  anecdotes: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      info: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired
    })
  ).isRequired
};

AnecdoteList.propTypes = {
  anecdotes: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      info: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired
    })
  ).isRequired
};

CreateNew.propTypes = {
  addNew: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};



const App = () => {
  
  //useState and function can only be defined and used within app function
  // const [page, setPage] = useState('anecdotes')

  //  //handle the menu page click
  //  const toPage = (page) => (event) =>{
  //   event.preventDefault()
  //   setPage(page)
  // }

  const padding = {
    paddingRight: 5
  }

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  // const anecdoteById = (id) =>
  //   anecdotes.find(a => a.id === id)

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id)

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1
  //   }

  //   setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  // }

  // const content = () =>{
  //   if (page === 'anecdotes'){
  //     return <AnecdoteList anecdotes={anecdotes} />
  //   }
  //   else if (page === 'createNew'){
  //     return <CreateNew addNew={addNew} />
  //   }
  //   else if (page === 'about'){
  //     return  <About />
  //   }
  // }

  return (
    <div>
      <h1>Software anecdotes</h1>
      {notification && <div style={{ color: 'green', marginBottom: '10px' }}>{notification}</div>}
      {/* <Menu /> */}
      {/* <div>
        <div>
          <a href='#'  onClick = {toPage('anecdotes')} style={padding}>anecdotes</a>
          <a href='#' onClick = {toPage('createNew')} style={padding}>create new</a>
          <a href='#' onClick = {toPage('about')} style={padding}>about</a>
        </div>
      </div>  */}
      <Router>
        <div>
          <Link style={padding} to='/'>anecdotes</Link >
          <Link  style={padding} to='/createNew'>create new</Link>
          <Link  style={padding} to='/about'>about</Link>
        </div>

        <Routes>
          <Route path='/' element ={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path='/createNew' element ={<CreateNew addNew={addNew}  setNotification = {setNotification} />} />
          <Route path='/about' element ={<About/>}/>
          <Route path='/anecdotes/:id' element ={<Anecdote anecdotes ={anecdotes}/>}/>
        </Routes>
        <div>
          <Footer />
        </div>
      </Router>

       {/* {content()}  */}

      
      {/* <AnecdoteList anecdotes={anecdotes} /> */}
      {/* <About /> */}
      {/* <CreateNew addNew={addNew} /> */}
     
    </div>
  )
}


export default App;




