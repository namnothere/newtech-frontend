import { Box, Button, Chip, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import Header from "../../components/layout/Header";
import TableWrapper from "../../components/common/TableWrapper";
import { DataGrid } from "@mui/x-data-grid";
import { deleteTopic, getDashboard } from "../../libs/api/dashboard";
import ConfirmDelete from "../../components/common/ConfirmDelete";
import { toast } from "react-toastify";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const Dashboard = () => {
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
      field: "name",
      headerName: "Tên đề tài",
      width: 300,
    },
    {
      field: "approved_budget",
      headerName: "Ngân sách",
      width: 200,
    },
    {
      field: "approved_hours",
      headerName: "Số giờ",
      width: 200,
    },
    {
      field: "completion_status",
      headerName: "Trạng thái",
      width: 200,
      renderCell: (row) => {
        const label =
          row.params?.completion_status == "not_started"
            ? "Not Start"
            : row.params?.completion_status == "in_progress"
            ? "In Progress"
            : "Completed";
        const color =
          row.params?.completion_status == "error"
            ? "Not Start"
            : row.params?.completion_status == "in_progress"
            ? "secondary"
            : "success";

        return <Chip label={label} color={color} size="small" />;
      },
    },
    {
      field: "accessLevel",
      headerName: "Hành động",
      width: 300,
      renderCell: (row) => {
        return (
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Button
              color="success"
              variant="contained"
              size="small"
              href={`/admin/topic/${row.row.id}`}
            >
              Chi tiết
            </Button>

            <Button
              color={"error"}
              variant="contained"
              size="small"
              onClick={() => {
                setIsOpen(true);
                setId(row.row.id);
              }}
            >
              Xóa
            </Button>
          </Box>
        );
      },
    },
  ];

  const handleRemove = async () => {
    try {
      await deleteTopic(id);
      toast.success("Xóa đề tài thành công");
      await fetchData();
      handleCloseRemove();
    } catch (error) {
      throw error;
    }
  };

  const handleCloseRemove = () => {
    setIsOpen(false);
    setId("");
  };

  const fetchData = async () => {
    try {
      const res = await getDashboard();
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
        <Header title="DASHBOARD" />
      </Box>
      <Box display={"flex"} justifyContent={"flex-end"}>
        <Button variant="contained" color="info" href="/admin/create-topic">
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <AddCircleOutlineOutlinedIcon />
            <Typography>Thêm mới đề tài</Typography>
          </Box>
        </Button>
      </Box>

      <TableWrapper>
        <DataGrid
          disableSelectionOnClick={true}
          rows={data}
          columns={columns}
        />
      </TableWrapper>

      <ConfirmDelete
        open={isOpen}
        handleClose={handleCloseRemove}
        handleOk={handleRemove}
      />
    </Box>
  );
};

export default Dashboard;
