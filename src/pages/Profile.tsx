import * as React from 'react';
import styled from 'styled-components'
import ProductHowItWorks from '../components/HowItWorks';
import AppBar from '../components/AppBar';
import AppFooter from '../components/AppFooter';
import withRoot from '../modules/withRoot';
import { Interface } from 'readline';
import User from '../components/UserDummy.json'
import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import erik from '../statics/avatars/Selfie_on_the_rocks.jpg';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PasswordIcon from '@mui/icons-material/Password';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';



interface User {
    firstname: string;
    lastname: string;
    age?: number;
    profilePicture?: string;
    paths?: string;
    //only temporary fields and datastructures
}

const Container = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding-top: 100;
`;

const TextContainer = styled.div`
display: flex;
flex: 2;
flex-direction: column;
justify-content: center;
align-items: center;
  
`;
const Text = styled.p`
display: flex;
flex: 1;
color: red;
font-size: x-large;
font-style: 'helvetica';
`;

const PictureContainer = styled.div`
display: flex;  
flex: 1;
justify-content: center;
align-items: center;
`;

const PathContainer = styled.div`
display: flex;
flex-direction: column;
flex: 1;
justify-content: center;
align-items: flex-start;
padding: 100;

  
`;

const PersonalInfoContainer = styled.div`
flex-direction: column;
display: flex;
flex: 1;
justify-content: center;
align-items: flex-start;
padding-left: 8%;
  
`;
const ListContainer = styled.div`
flex-direction: column;
display: flex;
flex: 1;
justify-content: center;
align-items: center;
padding-top: 5%;

  
`;





function Profile() {
    const access_token = localStorage.getItem('access_token');
    const user = User;
    //const paths: Array<string> = ;

    {/*useEffect(() => {
        axios
            .get(user_request) // getting data from backend
            .then((response) => {
                setUser(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);*/}
   
 


    return (
        <React.Fragment>
            <AppBar />
            <Container >
                <PersonalInfoContainer>
                    <TextContainer>
                        <Text>Hei, {user.userInfo.name}!</Text>
                    </TextContainer>
                    <PictureContainer>
                        <Avatar  src={erik} alt={user.userInfo.name[0]} sx={{ width: 200, height: 200 }} />
                    </PictureContainer>
                    <ListContainer>
                        <List>
                            <ListItem disablePadding >
                                <ListItemButton>
                                <ListItemIcon>
                                    <PasswordIcon />
                                </ListItemIcon>
                                <ListItemText primary="Change password" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>
                                <ListItemIcon>
                                    <SettingsAccessibilityIcon />
                                </ListItemIcon>
                                <ListItemText primary="Change personal settings" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>
                                <ListItemIcon>
                                    <AttachMoneyIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Fund this project" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                     </ListContainer>
                </PersonalInfoContainer>
                
                <PathContainer>
                    <p> Select one of your paths to view: </p>
                    <Autocomplete
                        disablePortal
                        id="Path box"
                        options={['Your first Strolly path', 'Your second Strolly path']}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Paths" />}
                        />

                </PathContainer>
            </Container>
            <AppFooter />
        </React.Fragment>
    );
}

export default withRoot(Profile);