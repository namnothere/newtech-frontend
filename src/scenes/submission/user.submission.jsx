import { Box, Button, Chip, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import Header from "../../components/layout/Header";
import TableWrapper from "../../components/common/TableWrapper";
import { DataGrid } from "@mui/x-data-grid";
import { rejectSubmisison, getSubmissions } from "../../libs/api/submission";
import { toast } from "react-toastify";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const UserSubmission = () => {
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
      field: "filename",
      headerName: "Tên File",
      width: 200,
    },
    {
      field: "path",
      headerName: "Đường dẫn",
      width: 200,
    },
    {
      field: "submission_date",
      headerName: "Ngày nộp",
      width: 200,
    },
    {
      field: "approval_status",
      headerName: "Trạng thái",
      width: 200,
      renderCell: (row) => {
        const label = row.row.approval_status?.toUpperCase();

        const color =
          row.row?.approval_status === "rejected"
          ? "error"
          : row.row?.approval_status === "approved"
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

        if (row.row?.approval_status === "pending") {
          return (
            <Box display={"flex"} alignItems={"center"} gap={2}>
              <Button
                color="success"
                variant="contained"
                size="small"
                onClick={() => {
                  setId(row.row.id)
                  handleEdit(row.row.id);
                }}
              >
                Chỉnh sửa
              </Button>
            </Box>
          );
        }
      },
    },
  ];

  const handleEdit = async (id) => {
    try {
      await rejectSubmisison(id);
      toast.success("Chỉnh sửa bài nộp thành công");
      await fetchData();
    } catch (error) {
      throw error;
    }
  };

  const fetchData = async () => {
    try {
      const res = await getSubmissions();
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

      <Box display={"flex"} justifyContent={"flex-end"}>
        <Button variant="contained" color="info" href="/create-topic">
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <AddCircleOutlineOutlinedIcon />
            <Typography>Nộp báo cáo đề tài</Typography>
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
    </Box>
  );
};

export default UserSubmission;
