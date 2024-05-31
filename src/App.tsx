import { ChangeEvent, SyntheticEvent, useState } from 'react';
import './App.css'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { data } from './db';

function App() {

  const [value, setValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [datasetName, setDatasetName] = useState("Science");
  const [open, setOpen] = useState(false);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: "25px" }}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Normal Search" id={`tab-${0}`} />
        <Tab label="Topic detiction" id={`tab-${1}`} />
      </Tabs>
      <div style={{ display: 'flex', gap: "15px" }}>
        <TextField
          id="search"
          placeholder='search here'
          value={searchQuery}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(event.target.value);
          }}
        />
        <Select
          id="select dataset"
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          value={datasetName}
          onChange={(event: SelectChangeEvent) => setDatasetName(event.target.value)}
        >
          <MenuItem value={"Science"}>Science</MenuItem>
          <MenuItem value={"Recreation"}>Recreation</MenuItem>
        </Select>
      </div>
      <div>
        {data.map((doc, index) => (
          <div style={{ padding: '10px', border: '1px solid #000' }} key={index}>
            <Typography color="GrayText">{doc}</Typography>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
