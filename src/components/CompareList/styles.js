import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 10px;
  margin: 0 15px;

  display: flex;
  flex-direction: column;

  .button-container {

    display: flex;
    justify-content: flex-end;
    padding: 5px;

      button {
      color: #fff
      border-radius: 5px;
      border: none;
      padding: 5px;
      margin: 5px 5px 0px 0px;
      width: 30px;
      display: flex;
      justify-content: center;

        i{
          pointer-events: none;
        }

      }

      button.refresh-button {
          background: #80d880;

          &:hover{
          background: #6ac76a;
          }
        }

      button.close-button{
        background: #fd7575;

        &:hover{
          background: #f55555;
        }
      }

  }

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 14px;
      color: #666;
    }

    img {
      width: 64px;
    }
  }

  ul {
    list-style: none;
    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }

      &:nth-child(2n-1) {
        background: #ececec;
      }
    }
  }
`;
