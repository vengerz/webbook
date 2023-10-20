import { useState } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Box,
  Code,
  Paper,
  Group,
  Select,
} from "@mantine/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Addbook() {
  const navigate = useNavigate();
  const [submittedValues, setSubmittedValues] = useState("");

  const form = useForm({
    initialValues: {
      name: "",
      author: "",
      category: "",
    },
  });

  return (
    <Box maw={500} mx="auto" pt={100}>
      <Paper shadow="sm" p={"md"}>
        <form
          onSubmit={form.onSubmit(async (values) => {
            const response = await axios.post(
              "http://localhost/webdb/member.php",
              {
                name: values.name,
                author: values.author,
                category: values.category,
              }
            );
            alert("Add book Success");
            navigate("/"); //กลับไปหน้า client
          })}
        >
          <TextInput
            withAsterisk
            label="ชื่อนิยาย"
            placeholder="ทดสอบชื่อ"
            {...form.getInputProps("name")}
          />
          <TextInput
            withAsterisk
            label="ผู้แต่ง"
            placeholder="ชื่อ - สกุล"
            mt="md"
            {...form.getInputProps("author")}
          />
          <Select
            label="ประเภท"
            placeholder="เลือกประเภท"
            data={["นิยายตลก", "นิยายแฟนตาซี", "นิยายโรแมนติก", "นิยาย Sci-fi"]}
            searchable
            {...form.getInputProps("category")}
          />
          <Group justify="center">
            <Button
              type="submit"
              mt="md"
              variant="gradient"
              gradient={{ from: "blue", to: "teal", deg: 0 }}
            >
              เพิ่ม
            </Button>
          </Group>
        </form>

        {submittedValues && <Code block>{submittedValues}</Code>}
      </Paper>
    </Box>
  );
}
