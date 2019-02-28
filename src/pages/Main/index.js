import React, { Component } from 'react';
import moment from 'moment';
import api from '../../services/api';
import logo from '../../assets/logo.png';

import { Container, Form } from './styles';
import CompareList from '../../components/CompareList';

export default class Main extends Component {
  state = {
    loading: false,
    repositoryError: false,
    repositoryInput: '',
    repositories: [],
  };

  componentDidMount() {
    const repositories = JSON.parse(localStorage.getItem('repositories')) || [];
    this.setState({ repositories });
  }

  updateRepository = async (id) => {
    const { repositories } = this.state;

    const updatedRepository = repositories.find(repository => repository.id === id);

    try {
      const { data } = await api.get(`/repos/${updatedRepository.full_name}`);
      data.lastCommit = moment(data.pushed_at).fromNow();
      this.setState({
        repositories: repositories.map(repository => (repository.id === data.id ? data : repository)),
      });

      localStorage.setItem('repositories', JSON.stringify(repositories));
    } catch (e) {
      this.setState({ repositoryError: true });
    }
  };

  removeRepository = (id) => {
    const { repositories } = this.state;

    const updatedRepositories = repositories.filter(repository => id !== repository.id);

    this.setState({ repositories: updatedRepositories });

    localStorage.setItem('repositories', JSON.stringify(updatedRepositories));
  };

  checkLocalStorage = (newRepository) => {
    const repositories = JSON.parse(localStorage.getItem('repositories')) || [];
    let hasSameRepositorie = false;

    repositories.forEach((repository) => {
      if (repository.id === newRepository.id) hasSameRepositorie = true;
    });
    return hasSameRepositorie;
  };

  handleAddRepository = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    try {
      const { data: repository } = await api.get(`/repos/${this.state.repositoryInput}`);

      if (this.checkLocalStorage(repository)) {
        this.setState({ repositoryError: true });
      } else {
        repository.lastCommit = moment(repository.pushed_at).fromNow();

        this.setState({
          repositoryInput: '',
          repositories: [...this.state.repositories, repository],
          repositoryError: false,
        });

        localStorage.setItem('repositories', JSON.stringify(this.state.repositories));
      }
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form withError={this.state.repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="usuario/repositório"
            value={this.state.repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">
            {this.state.loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}
          </button>
        </Form>

        <CompareList
          repositories={this.state.repositories}
          updateRepository={this.updateRepository}
          removeRepository={this.removeRepository}
        />
      </Container>
    );
  }
}
