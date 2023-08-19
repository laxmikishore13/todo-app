/* eslint-disable react/prop-types */
import { Delete, Done, Edit } from "@mui/icons-material";
import { Box, Grid, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

function List(props) {
  const [isEditable, setIsEditable] = useState(false);
  return (
    <>
      <Box sx={{ marginTop: 8 }}>
        <Grid container spacing={2}>
          {props.tasks?.map((item, index) => {
            return (
              <Grid item xs={12} sm={10} key={index}>
                <TextField
                  fullWidth
                  disabled={item.isDisabled}
                  value={item.taks}
                  key={index}
                  InputProps={{
                    endAdornment: (
                      <>
                        {!isEditable ? (
                          <InputAdornment position="end">
                            <Edit
                              onClick={() => {
                                props.handleTask(index);
                                setIsEditable(true);
                              }}
                              sx={{ cursor: "pointer" }}
                            />
                          </InputAdornment>
                        ) : null}
                        <InputAdornment position="end">
                          <Delete sx={{ cursor: "pointer" }} />
                        </InputAdornment>
                        {isEditable ? (
                          <InputAdornment position="end">
                            <Done sx={{ cursor: "pointer" }} />
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
