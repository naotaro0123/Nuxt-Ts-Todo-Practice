/* eslint-disable no-console */
import Vuex from 'vuex';
import { Todo } from '~/components/interface/Todo';

const todoList: Todo[] = [
  {
    content: 'hogehoge',
    created: '2019-04-30 15:30'
  },
  {
    content: 'hogehogehoge',
    created: '2019-04-30 15:40'
  },
  {
    content: 'fugafuga',
    created: '2019-04-30 16:00'
  },
  {
    content: 'fugafugafuga',
    created: '2019-04-30 16:10'
  }
];

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      todos: todoList
    }),
    getters: {
      todos: state => {
        return state.todos;
      }
    },
    mutations: {
      insert: (state, content) => {
        const date = new Date();
        const formatedDate =
          date.getFullYear() +
          '-' +
          ('00' + (date.getMonth() + 1)).slice(-2) +
          '-' +
          ('00' + (date.getDate() + 1)).slice(-2) +
          '-' +
          ('00' + (date.getHours() + 1)).slice(-2) +
          ':' +
          ('00' + (date.getMinutes() + 1)).slice(-2);
        state.todos.unshift({
          content: content,
          created: formatedDate
        });
      },
      remove: (state, todo: Todo) => {
        for (let i = 0; i < state.todos.length; i++) {
          const stateTodos = state.todos[i];
          if (
            stateTodos.content === todo.content &&
            stateTodos.created === todo.created
          ) {
            console.log(`remove ${todo.content}`);
            state.todos.splice(i, 1);
            return;
          }
        }
      }
    },
    actions: {
      insert({ commit }, content) {
        commit('insert', content);
      },
      remove({ commit }, todo) {
        commit('remove', todo);
      }
    }
  });
};

export default createStore;
