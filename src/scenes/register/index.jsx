import { Box, Button, Chip, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import Header from "../../components/layout/Header";
import TableWrapper from "../../components/common/TableWrapper";
import { DataGrid } from "@mui/x-data-grid";
import { approveRegister, getRegisters, rejectRegister } from "../../libs/api/register";
import ConfirmDelete from "../../components/common/ConfirmDelete";
import { toast } from "react-toastify";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const Register = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");

  const columns = [
    {
      field: "index",
      headerName: "STT",
      width: 80,
    },
    {
      field: "topic.name",
      headerName: "Tên đề tài",
      width: 300,
      renderCell: (params) => {
        return params.row.topic?.name;
      },
    },
    {
      field: "expected_budget",
      headerName: "Ngân sách",
      width: 200,
    },
    {
      field: "expected_hours",
      headerName: "Số giờ",
      width: 200,
    },
    {
      field: "registered_date",
      headerName: "Ngày đăng kí",
      width: 200,
    },
    {
      field: "approval_status",
      headerName: "Trạng thái",
      width: 200,
      renderCell: (row) => {
        const label = row.row.approval_status?.toUpperCase();

        const color =
          row.row?.approval_status == "rejected"
          ? "error"
          : row.row?.approval_status == "approved"
          ? "success"
          : "default";

        return <Chip label={label} color={color} size="small" />;
      },
    },
    {
      field: "accessLevel",
      headerName: "Hành động",
      width: 300,
      renderCell: (row) => {

        if (row.row?.approval_status == "pending") {
          return (
            <Box display={"flex"} alignItems={"center"} gap={2}>
              <Button
                color="success"
                variant="contained"
                size="small"
                onClick={() => {
                  setId(row.row.id)
                  handleApprove(row.row.id);
                }}
              >
                Duyệt
              </Button>
  
              <Button
                color={"error"}
                variant="contained"
                size="small"
                onClick={() => {
                  setIsOpen(true);
                  setId(row.row.id)
                  handleReject(row.row.id);
                }}
              >
                Từ chối
              </Button>
            </Box>
          );
        }
      },
    },
  ];

  const handleReject = async (id) => {
    try {
      await rejectRegister(id);
      toast.success("Từ chối đăng kí thành công");
      await fetchData();
    } catch (error) {
      throw error;
    }
  };

  const handleApprove = async (id) => {
    await approveRegister(id);
    toast.success("Duyệt đăng kí thành công");
    setIsOpen(false);
    setId("");
  };

  const fetchData = async () => {
    try {
      const res = await getRegisters();
      setData(res?.data?.data?.map((e, index) => ({ index: index + 1, ...e })));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="REGISTER REVIEWING" />
      </Box>

      <TableWrapper>
        <DataGrid
          disableSelectionOnClick={true}
          rows={data}
          columns={columns}
        />
      </TableWrapper>

      {/* <ConfirmDelete
        open={isOpen}
        handleClose={handleCloseRemove}
        handleOk={handleRemove}
      /> */}
    </Box>
  );
};

export default Register;
