import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import {
  Table,
  Button,
  Container,
  Pagination,
  Form,
  InputGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import {
  activate,
  deleteUser,
  inactive,
  listUsers,
} from "../actions/userActions";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import Meta from "../components/Meta";

const UserListScreen = () => {
  // pulls the pageNumber and Keyword search params
  const { pageNumber = 1, keyword = "" } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const { loading, users, pages, page } = useSelector(
    (state) => state.userList
  );
  const { userInfo, loading: userLoading } = useSelector(
    (state) => state.userLogin
  );
  const { success: successDelete } = useSelector((state) => state.userDelete);
  const { success } = useSelector((state) => state.userUpdate);

  useEffect(() => {
    if (userInfo || userInfo.isAdmin) {
      dispatch(listUsers(keyword, pageNumber));
    } else {
      navigate("/login");
    }
  }, [
    dispatch,
    userInfo,
    successDelete,
    navigate,
    pageNumber,
    keyword,
    success,
    userLoading,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/admin/userlist/search/${search}/page/${pageNumber || 1}`);
    } else {
      navigate("/admin/userlist");
    }
  };
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure? This action cannot be undone!")) {
      dispatch(deleteUser(id));
    }
  };
  const inactiveHandler = (id) => {
    if (window.confirm("Are you sure you?")) {
      dispatch(inactive(id));
    }
  };
  const activeHandler = (id) => {
    if (window.confirm(`Are you sure youd like to re-activate this user?`)) {
      dispatch(activate(id));
    }
  };

  return (
    <>
      <Meta title={`Admin | Users`} />
      <Container style={{ fontFamily: "sans-serif" }}>
        <h1>Users</h1>
        <Form onSubmit={submitHandler} inline style={{ padding: "2%" }}>
          <InputGroup>
            <Form.Control
              type="text"
              name="q"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Users"
              className="mr-sm-2 ml-sm-5"
            ></Form.Control>
            <Button type="submit" variant="outline-success" className="p-2">
              Search
            </Button>
          </InputGroup>
          <Form.Text>
            Currently you can only search based off a users first name
          </Form.Text>
        </Form>

        {loading ? (
          <Loader />
        ) :  (
          <Table
            striped
            bordered
            hover
            responsive
            variant="dark"
            className="table-sm"
            style={{ padding: "5%" }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Inactive/Active</th>
                <th>Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.firstName + " " + user.lastName}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {user.isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {user.isActive ? (
                      <Button
                        onClick={() => inactiveHandler(user._id)}
                        variant="light"
                        className="btn-sm"
                        disabled={userInfo._id === user._id}
                      >
                        <i
                          className="fas fa-check"
                          style={{ color: "green" }}
                        ></i>
                      </Button>
                    ) : (
                      <Button
                        onClick={() => activeHandler(user._id)}
                        variant="light"
                        className="btn-sm"
                        disabled={userInfo._id === user._id}
                      >
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      </Button>
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(user._id)}
                      disabled={userInfo._id === user._id}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <Container>
          {userInfo && pages > 1 && (
            <Pagination style={{ justifyContent: "center", fontSize: ".8rem" }}>
              {[...Array(pages).keys()].map((x) => (
                <LinkContainer
                  key={x + 1}
                  to={
                    userInfo.isAdmin
                      ? search
                        ? `/admin/userlist/search/${search}/page/${x + 1}`
                        : `/admin/userlist/${x + 1}`
                      : `/admin/userlist/${x + 1}`
                  }
                >
                  <Pagination.Item
                    active={x + 1 === page}
                    style={{ padding: "0" }}
                  >
                    {x + 1}
                  </Pagination.Item>
                </LinkContainer>
              ))}
            </Pagination>
          )}
        </Container>
      </Container>
    </>
  );
};

export default UserListScreen;
