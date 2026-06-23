import {
    Container,
    Paper,
    Typography,
    Grid,
    TextField,
    MenuItem,
    Button,
    Divider,
    Box
  } from "@mui/material";
  import { useState } from "react";
  import Alert from "@mui/material/Alert";
  import axios from "axios";

function MigrationPage() {

const [sourceResult, setSourceResult] = useState(null);
const [sourceDbType, setSourceDbType] = useState("");
const [sourceHost, setSourceHost] = useState("");
const [sourcePort, setSourcePort] = useState("");
const [sourceDatabase, setSourceDatabase] = useState("");
const [sourceUsername, setSourceUsername] = useState("");
const [sourcePassword, setSourcePassword] = useState("");
const [targetResult, setTargetResult] = useState(null);
  const [targetDbType, setTargetDbType] = useState("");
const [targetHost, setTargetHost] = useState("");
const [targetPort, setTargetPort] = useState("");
const [targetDatabase, setTargetDatabase] = useState("");
const [targetUsername, setTargetUsername] = useState("");
const [targetPassword, setTargetPassword] = useState("");
const [mappingResult, setMappingResult] = useState(null);
const [loading, setLoading] = useState(false);
const [mappingFile, setMappingFile] = useState(null);
const [editableMappings, setEditableMappings] = useState([]);

const testSourceConnection = async () => {
  try {
    // console.log({
    //   db_type: sourceDbType,
    //   host: sourceHost,
    //   port: sourcePort,
    //   database_name: sourceDatabase,
    //   username: sourceUsername
    // });
    const SourceResponse = await axios.post(
      "http://127.0.0.1:8000/database/test-connection",
      {
        db_type: sourceDbType,
        host: sourceHost,
        port: parseInt(sourcePort),
        database_name: sourceDatabase,
        username: sourceUsername,
        password: sourcePassword
      }
    );

    setSourceResult({
      success: true,
      message: SourceResponse.data.message
    });
  } catch (error) {
    setSourceResult({
      success: false,
      message:
        error.SourceResponse?.data?.detail ||
        error.message
    });
  }
};





const testTargetConnection = async () => {
  try {
    // console.log({
    //   db_type: sourceDbType,
    //   host: sourceHost,
    //   port: sourcePort,
    //   database_name: sourceDatabase,
    //   username: sourceUsername
    // });
    const TargetResponse = await axios.post(
      "http://127.0.0.1:8000/database/test-connection",
      {
        db_type: targetDbType,
        host: targetHost,
        port: parseInt(targetPort),
        database_name: targetDatabase,
        username: targetUsername,
        password: targetPassword
      }
    );

    setTargetResult({
      success: true,
      message: TargetResponse.data.message
    });
  } catch (error) {
    setTargetResult({
      success: false,
      message:
        error.TargetResponse?.data?.detail ||
        error.message
    });
  }
};




const generateMappings = async () => {
  try {
    setLoading(true);

    console.log("Calling API...");

    const response = await axios.post(
      "http://127.0.0.1:8000/database/get-mappings",
      {
        source_db: {
          db_type: sourceDbType,
          host: sourceHost,
          port: parseInt(sourcePort),
          database_name: sourceDatabase,
          username: sourceUsername,
          password: sourcePassword
        },
        target_db: {
          db_type: targetDbType,
          host: targetHost,
          port: parseInt(targetPort),
          database_name: targetDatabase,
          username: targetUsername,
          password: targetPassword
        },
        local_doc_path: null
      }
    );

    console.log("Response:");
    console.log(response.data);

    setEditableMappings(response.data.mappings);
    setMappingResult(response.data);

  } catch (error) {
    console.log("ERROR:");
    console.log(error);
    console.log(error.response);

    alert(
      JSON.stringify(
        error.response?.data,
        null,
        2
      )
    );
  } finally {
    setLoading(false);
  }
};


const updateTable = (
  tableIndex,
  field,
  value
) => {
  const updated = [...editableMappings];

  updated[tableIndex][field] = value;

  setEditableMappings(updated);
};


const updateColumn = (
  tableIndex,
  columnIndex,
  field,
  value
) => {
  const updated = [...editableMappings];

  updated[tableIndex]
    .column_mappings[columnIndex][field] =
      value;

  setEditableMappings(updated);
};






  const databases = [
    "postgresql",
    "Oracle",
    "DB2",
    "SQL Server",
    "MySQL",
    "Snowflake",
    "Redshift",
    "Teradata",
    "MongoDB"
  ];
  const [testResult, setTestResult] = useState(null);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={4} sx={{ p: 4 }}>

        <Typography variant="h4" gutterBottom>
          Create Migration Project
        </Typography>

        <Typography variant="body1" color="text.secondary" gutterBottom>
          Configure source and target database connections to begin migration.
        </Typography>

        <Box sx={{ mt: 3, mb: 3 }}>
          <Typography variant="subtitle1">
            Step 1 of 5
          </Typography>

          <Typography variant="body2" color="primary">
            Create Project → Mapping Review → Summary → Execute → Validation
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={4}>

          {/* SOURCE */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Source Database
            </Typography>

            <TextField
  select
  fullWidth
  label="Database Type"
  margin="normal"
  value={sourceDbType}
  onChange={(e) => setSourceDbType(e.target.value)}
>
              {databases.map((db) => (
                <MenuItem key={db} value={db}>
                  {db}
                </MenuItem>
              ))}
            </TextField>

            <TextField
  fullWidth
  label="Host"
  margin="normal"
  value={sourceHost}
  onChange={(e) => setSourceHost(e.target.value)}
/>

<TextField
  fullWidth
  label="Port"
  margin="normal"
  value={sourcePort}
  onChange={(e) => setSourcePort(e.target.value)}
/>

<TextField
  fullWidth
  label="Database Name"
  margin="normal"
  value={sourceDatabase}
  onChange={(e) => setSourceDatabase(e.target.value)}
/>

<TextField
  fullWidth
  label="Username"
  margin="normal"
  value={sourceUsername}
  onChange={(e) => setSourceUsername(e.target.value)}
/>

<TextField
  fullWidth
  label="Password"
  type="password"
  margin="normal"
  value={sourcePassword}
  onChange={(e) => setSourcePassword(e.target.value)}
/>

<Button
  variant="outlined"
  onClick={testSourceConnection}
>
  Test Connection
</Button>


{sourceResult && (
  <Alert
    severity={
      sourceResult.success
        ? "success"
        : "error"
    }
    sx={{ mt: 2 }}
  >
    {sourceResult.message}
  </Alert>
)}
          </Grid>

          {/* TARGET */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Target Database
            </Typography>

            <TextField
  select
  fullWidth
  label="Database Type"
  margin="normal"
  value={targetDbType}
  onChange={(e) => setTargetDbType(e.target.value)}
>
              {databases.map((db) => (
                <MenuItem key={db} value={db}>
                  {db}
                </MenuItem>
              ))}
            </TextField>

            <TextField
  fullWidth
  label="Host"
  margin="normal"
  value={targetHost}
  onChange={(e) => setTargetHost(e.target.value)}
/>

<TextField
  fullWidth
  label="Port"
  margin="normal"
  value={targetPort}
  onChange={(e) => setTargetPort(e.target.value)}
/>

<TextField
  fullWidth
  label="Database Name"
  margin="normal"
  value={targetDatabase}
  onChange={(e) => setTargetDatabase(e.target.value)}
/>

<TextField
  fullWidth
  label="Username"
  margin="normal"
  value={targetUsername}
  onChange={(e) => setTargetUsername(e.target.value)}
/>

<TextField
  fullWidth
  label="Password"
  type="password"
  margin="normal"
  value={targetPassword}
  onChange={(e) => setTargetPassword(e.target.value)}
/>

<Button
  variant="outlined"
  onClick={testTargetConnection}
>
  Test Connection
</Button>

{targetResult && (
  <Alert
    severity={
      targetResult.success
        ? "success"
        : "error"
    }
    sx={{ mt: 2 }}
  >
    {targetResult.message}
  </Alert>
)}
          </Grid>

        </Grid>

        <Divider sx={{ mt: 4, mb: 4 }} />

        <Typography variant="h6" gutterBottom>
          Mapping Reference Document (Optional)
        </Typography>

        <input type="file" />

        <Box sx={{ mt: 4 }}>
        <Button
  variant="contained"
  size="large"
  onClick={generateMappings}
  disabled={loading}
>
  {loading ? "Generating..." : "Generate Mapping"}
</Button>

{editableMappings.length > 0 && (
  <Box sx={{ mt: 4 }}>

    <Typography variant="h5" gutterBottom>
      Review Generated Mappings
    </Typography>

    {editableMappings.map((table, tableIndex) => (
      <Paper
        key={tableIndex}
        sx={{ mt: 2, p: 2 }}
      >
        <TextField
          fullWidth
          label="Source Table"
          value={table.source_table}
          sx={{ mb: 2 }}
          onChange={(e) =>
            updateTable(
              tableIndex,
              "source_table",
              e.target.value
            )
          }
        />

        <TextField
          fullWidth
          label="Target Table"
          value={table.target_table}
          sx={{ mb: 2 }}
          onChange={(e) =>
            updateTable(
              tableIndex,
              "target_table",
              e.target.value
            )
          }
        />

        <Typography variant="h6">
          Column Mappings
        </Typography>

        {table.column_mappings.map(
          (column, columnIndex) => (
            <Box
              key={columnIndex}
              sx={{
                border: 1,
                borderColor: "grey.300",
                p: 2,
                mt: 2,
                borderRadius: 1
              }}
            >
              <TextField
                fullWidth
                label="Source Column"
                value={column.source_column}
                sx={{ mb: 2 }}
                onChange={(e) =>
                  updateColumn(
                    tableIndex,
                    columnIndex,
                    "source_column",
                    e.target.value
                  )
                }
              />

              <TextField
                fullWidth
                label="Target Column"
                value={column.target_column}
                sx={{ mb: 2 }}
                onChange={(e) =>
                  updateColumn(
                    tableIndex,
                    columnIndex,
                    "target_column",
                    e.target.value
                  )
                }
              />

              <TextField
                fullWidth
                multiline
                rows={2}
                label="Transformation Rule"
                value={column.transformation_rule}
                onChange={(e) =>
                  updateColumn(
                    tableIndex,
                    columnIndex,
                    "transformation_rule",
                    e.target.value
                  )
                }
              />
            </Box>
          )
        )}
      </Paper>
    ))}
  </Box>
)}
        </Box>

      </Paper>
    </Container>
  );


}

export default MigrationPage;