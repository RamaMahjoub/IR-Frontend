import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { SyntheticEvent, useDeferredValue, useEffect, useState } from 'react';
import './App.css';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { CircularProgress } from '@mui/material';

function App() {

  const [value, setValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const defferedSearchQuery = useDeferredValue(searchQuery)
  const [datasetName, setDatasetName] = useState("science");
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<{ id: string, content: string }[]>([])
  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const fetchSearchAnswers = async () => {
    console.log("loading")
    setLoading(true)
    await fetch(`http://192.168.1.108:8001/search?dataset_name=${datasetName}&query=${searchQuery}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error))
      .finally(() => setLoading(false));
    console.log("finish loading")
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`http://192.168.1.108:8002/suggestions?dataset_name=${datasetName}&query=${searchQuery}`)
        .then(response => response.json())
        .then(data => setSuggestions(data))
        .catch(error => console.error('Error:', error));
    };


    fetchData();
  }, [datasetName, searchQuery])

  const handleChangeSearchQuery = (_e: unknown, value: string) => {
    console.log(value)
    setSearchQuery(value)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: "25px", }}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Normal Search" id={`tab-${0}`} />
        <Tab label="Crawling" id={`tab-${1}`} />
      </Tabs>
      <div style={{ display: 'flex', gap: "15px" }}>

        <Autocomplete
          fullWidth
          onInputChange={(_e, data: string) => handleChangeSearchQuery(_e, data)}
          value={defferedSearchQuery}
          autoHighlight
          options={suggestions}
          ListboxComponent={List}
          getOptionLabel={option => option}
          renderInput={params => (
            <TextField {...params}
              placeholder='search here' />
          )}
          renderOption={(props, option) => (
            <ListItem {...props}>
              <ListItemText primary={option} />
            </ListItem>
          )}
        />
        <Select
          id="select dataset"
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          value={datasetName}
          onChange={(event: SelectChangeEvent) => setDatasetName(event.target.value)}
        >
          <MenuItem value={"science"}>Science</MenuItem>
          <MenuItem value={"recreation"}>Recreation</MenuItem>
        </Select>
        <Button variant='contained' onClick={fetchSearchAnswers}>Search</Button>
      </div>
      {loading ? <CircularProgress /> :
        <div>
          {data.map((doc) => (
            <div key={doc.id} style={{ padding: '10px', border: '1px solid #000', display: 'flex', gap: 25 }}>
              <Typography color="GrayText" sx={{ fontWeight: 'bold' }}>{doc.id}</Typography>
              <Typography color="GrayText">{doc.content}</Typography>
            </div>
          ))}
        </div>
      }
    </div>
  )
}

export default App
