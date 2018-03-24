import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class Create extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleCreate = this.handleCreate.bind(this)
    this.state = {
      title: '',
      text: '',
      isPublished: false,
      error: null,
    }
  }

  handleCreate = async (e) => {
    e.preventDefault()
    const { title, text, isPublished } = this.state
    this.setState({ error: null })
    try {
      const result = await this.props.createDraftMutation({
        variables: {
          title,
          text,
          isPublished,
        },
      })
      const { id } = result.data.createDraft
      this.props.history.push(`/post/${id}`)
    } catch (e) {
      this.setState({ error: e.message.replace('GraphQL error: ', '')})
    }
  }

  render() {
    const { title, error } = this.state
    return (
      <div style={{width: '600px', margin: '40px auto'}}>
        <h4>Create draft</h4>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={this.handleCreate}>
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              type="text"
              value={title}
              placeholder="title"
              onChange={({ target: { value: title }}) => this.setState({ title })}
              />
          </div>
          <div className="form-group">
            <label>Body</label>
            <textarea
              className="form-control"
              type="text"
              rows="3"
              onChange={({ target: { value: text }}) => this.setState({ text })}
              />
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="isPublished"
              onChange={({ target: { checked: isPublished }}) => this.setState({ isPublished })}
              />
              <label className="form-check-label" htmlFor="isPublished">
                Publish?
              </label>
          </div>
          <button type="submit" className="btn btn-primary">Create</button>
        </form>
      </div>
    )
  }
}

const CREATE_DRAFT_MUTATION = gql`
  mutation CreateDraftMutation($title: String!, $text: String!, $isPublished: Boolean!) {
    createDraft(title: $title, text: $text, isPublished: $isPublished) {
      id
      title
      text
    }
  }
`

const CreateWithMutation = graphql(CREATE_DRAFT_MUTATION, {
  name: 'createDraftMutation',
})(Create)

export default withRouter(CreateWithMutation)
