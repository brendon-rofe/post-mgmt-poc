import { Button } from '@chakra-ui/react';
import { BigNumber, ethers } from 'ethers';
import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { getPublication } from '../api/get-publication';
import { TEST_ABI, testContractAddr } from './abi';
import Navbar from '../components/Navbar';

const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/DfetfELTdOKv7rjaiM9uzRoZfeUSFQrC");
const testContract = new ethers.Contract(testContractAddr, TEST_ABI, provider);

const profileId = BigNumber.from(14419).toHexString();
console.log(profileId);

interface Props {
  data: string
}

const Home: NextPage = () => {
  const [publicationIds, setPublicationIds] = useState([]);
  const [pub, setPub] = useState({});

  useEffect(() => {
    // getPubs(publicationIds);
    getPub();
    // getUserPostIds();
  }, [publicationIds])

  async function getUserPostIds() {
    let userPostIds = await testContract.getAllUserPostIds(profileId);
    // console.log(userPostIds);
    setPublicationIds(userPostIds);
    console.log(publicationIds);
  }

  function getPubs(publicationIds: any) {
    for (let i = 0; i < publicationIds.length; i++) {
      getPublication(publicationIds[i]);
    }
  }

  function getPub() {
    const result = getPublication("0x3853-0x01");
    setPub(result);
  }

  return (
    <>
      <Navbar />
        <Button onClick={getUserPostIds} >Get User Post Ids</Button>
        <p>{publicationIds}</p>
        {/* <p>{pub?.id}</p> */}
    </>
  )
}

export default Home
