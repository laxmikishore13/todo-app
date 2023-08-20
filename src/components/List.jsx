/* eslint-disable react/prop-types */
import { Delete, Done, Edit } from "@mui/icons-material";
import { Box, Grid, InputAdornment, TextField } from "@mui/material";

function List(props) {
  return (
    <>
      <Box sx={{ marginTop: 8 }}>
        <Grid container spacing={2}>
          {props.tasks?.map((item) => {
            return (
              <Grid item xs={12} sm={10} key={item.id}>
                <TextField
                  fullWidth
                  disabled={!item.isEditable}
                  value={item.description}
                  key={item.id}
                  onChange={(e) => props.handleTask(item.id, e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <>
                        {!item.isEditable ? (
                          <InputAdornment position="end">
                            <Edit
                              onClick={() => {
                                props.handleTask(item.id);
                                // setIsEditable(true);
                              }}
                              sx={{ cursor: "pointer" }}
                            />
                          </InputAdornment>
                        ) : null}
                        <InputAdornment position="end">
                          <Delete
                            onClick={() => props.deleteRequest(item.id)}
                            sx={{ cursor: "pointer" }}
                          />
                        </InputAdornment>
                        {item.isEditable ? (
                          <InputAdornment position="end">
                            <Done
                              onClick={() => props.updateRequest(item.id)}
                              sx={{ cursor: "pointer" }}
                            />
                          </InputAdornment>
                        ) : null}
                      </>
                    ),
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
}

export default List;
