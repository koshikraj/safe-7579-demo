import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Text,
  Group,
  Input,
  Paper,
  Select,
  useMantineColorScheme,
  Combobox,
  useCombobox,
  InputBase,
  Anchor,
  Alert,
  TextInput,
} from '@mantine/core';
import classes from './Home.module.css';
import ETHIndia from '../../assets/images/ethindia.svg';
import Safe from '../../assets/images/safe.svg';

import { NetworkUtil } from '../../logic/networks';
import { useDisclosure } from '@mantine/hooks';
import { DateTimePicker } from '@mantine/dates';
import {  addValidatorModule } from '../../logic/module';
import { ZeroAddress } from 'ethers';

import Confetti from 'react-confetti';
import { IconBrandGithub, IconCoin} from '@tabler/icons';


import { useNavigate } from 'react-router-dom';
import { getProvider } from '@/logic/web3';
import { getIconForId, getTokenInfo, getTokenList, tokenList } from '@/logic/tokens';

import {CopyToClipboard} from 'react-copy-to-clipboard';
import { getSafeInfo } from '@/logic/safeapp';
import { formatTime, getTokenBalance } from '@/logic/utils';
import { formatEther } from 'viem';
import { IconBrandTwitterFilled, IconBrandX } from '@tabler/icons-react';
import { RoutePath } from '@/navigation/route-path';



function HomePage() {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  


  const { colorScheme } = useMantineColorScheme();

  const dark = colorScheme === 'dark';

  const [ownerAddress, setOwnerAddress] = useState<string>("0x0000000000000000000000000000000000000000");
  const [network, setNetwork] = useState('');
  const [chainId, setChainId] = useState(5);

  const [sessionCreated, setSessionCreated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sessionKey, setSessionKey] = useState({address: '', privateKey: ''});
  const [isLoading, setIsLoading] = useState(false);
  const [safeError, setSafeError] = useState(false);





  const create = async () => {
    setIsLoading(true);
    try {
     await addValidatorModule(
        ownerAddress
      );
      setIsLoading(false);
    } catch (e) { 
      console.log(e)
      setIsLoading(false);
      setSafeError(true);
    }
    setSessionCreated(true);
  };


 
  useEffect(() => {
    (async () => {
      const provider = await getProvider();

      const chainId = (await provider.getNetwork()).chainId;

      setChainId(Number(chainId));
      setNetwork(
        `${NetworkUtil.getNetworkById(Number(chainId))?.name}`
      );


        
    })();
  }, []);

  return (
    <>

            <div>      

            <h1 className={classes.heading}>External validator for your
            <div className={classes.safeContainer}>
            <img
            className={classes.safe}
            src={Safe}
            alt="avatar"
            />
            </div>


            </h1>

            </div>
      { sessionCreated && !safeError? (
        <>
          <div className={classes.successContainer}>
            <Paper className={classes.formContainer} shadow="md" withBorder radius="md" >
              <h1 className={classes.heading}>Session Key is Ready!</h1>

              <p className={classes.subheading} style={{ textAlign: 'center' }}>
                
               This session key is like a magic wand. Check out the magic <Anchor onClick={() => navigate(RoutePath.account)}>here </Anchor> ❤️ ❤️
              </p>

              <div className={classes.copyContainer}>
                <Input
                  className={classes.input}
                  // style={{ width: '400px' }}
                  value={sessionKey.privateKey}
                  placeholder={sessionKey.privateKey}
                />
            
              </div>
              <div className={classes.actions}>
            
            <Button size="lg" radius="md"
              onClick={() => setSessionCreated(false)}
             style={{ width: '180px' }}        
                color={ dark ? "#49494f" : "#c3c3c3" } 
                variant={ "filled" } 
               >Create New</Button>
               <CopyToClipboard text={sessionKey.privateKey}
                onCopy={() => setCopied(true)}>
          <Button size="lg" radius="md" style={{ width: '180px' }}  color="teal">
          {copied ? 'Key Copied' : 'Copy Key'}
            </Button>
            </CopyToClipboard >
          </div>
              {/* <div className={classes.goBack}>
                <Button variant="primary" onClick={() => setSharableLink('')}>
                  Create new Link
                </Button>
              </div> */}
            </Paper>
          </div>
        </>
      ) : (
        <>
        

        
        <div className={classes.homeContainer}>

        <Paper className={classes.formContainer} shadow="md" withBorder radius="md" p="xl" >

        { !Object.keys(tokenList).includes(chainId.toString()) && <Alert variant="light" color="yellow" radius="lg" title="Unsupported Network">
      SafeValidator supports only these networks as of now <b> : <br/> {Object.keys(tokenList).map((chainId) => `${NetworkUtil.getNetworkById(Number(chainId))?.name} ${NetworkUtil.getNetworkById(Number(chainId))?.type}, `)} </b>
    </Alert> }

    { safeError && <Alert variant="light" color="yellow" radius="lg" title="Open as Safe App">

     Try this application as a <span/>
      <Anchor href="https://app.safe.global/share/safe-app?appUrl=https://7579-validator.zenguard.xyz&chain=sep">
      Safe App
        </Anchor> <span/>
        on Safe Wallet.
      
    </Alert> }
          
          
          
          {/* <div className={classes.formContainer}> */}
            
            <div className={classes.inputContainer}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '20px',
                  marginBottom: '20px',
                  alignItems: 'center',
                }}
              >

              </div>

              <Input.Wrapper label={`Enter a new owner address for your Safe `}>
                <TextInput
                  type="string"
                  size="lg"
                  value={ownerAddress}
                  onChange={(e) => setOwnerAddress(e?.target?.value)}
                  placeholder="Enter Address"
                  // className={classes.input}
                  description={`The address of the new owner for the Safe.`}
                  inputWrapperOrder={['label', 'input', 'description']}
                />
              </Input.Wrapper>
            </div>
            
            <Button
              size="lg" radius="md" 
              fullWidth
              color="green"
              className={classes.btn}
              onClick={create}
              loaderProps={{ color: 'white', type: 'dots', size: 'md' }}
              loading={isLoading}
            >
              {isLoading ? 'Creating Link ...' : 'Create Session'}
            </Button>
            <br/>

            <p className={classes.subHeading}>
              Just enter the new owner address for your Safe ✨
            </p>
          </Paper>
          
        </div>

     
        </>
      )}
             
             <div className={classes.avatarContainer}>

            <Group className={classes.mode}>
            {/* <Group className={classes.container} position="center"> */}
            <IconBrandX 
            size={30}
            stroke={1.5}
            onClick={() => window.open("https://x.com/zenguardxyz")}
            style={{ cursor: 'pointer' }}
            />
            <IconBrandGithub
            size={30}
            stroke={1.5}
            onClick={() => window.open("https://github.com/koshikraj/safe-7579-demo")}
            style={{ cursor: 'pointer' }}
            />

            {/* </Group> */}
            {/* </Group> */}
            </Group>
            </div>
    </>
  );
}

export default HomePage;

// show dropdown. no model. list all token
