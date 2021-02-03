import { useEffect } from "react";
import { Heading, Container } from "@chakra-ui/react";

import ProfileForm from "./components/ProfileForm";
import { GetUserProfile } from "../../models/GetUserProfile";

type ProfilePageProps = {
  loader: GetUserProfile;
}

const ProfilePage = ({ loader }: ProfilePageProps) => {
  
  useEffect(() => {
    async function loadUsers() {
      try {
        const result = await loader.load(4)
        console.log(result)
      } catch {
        console.log("error")
      }
    }

    loadUsers()
  }, [loader]);

  return (
    <Container border="1px solid" borderColor="gray.300" padding="10" borderRadius="lg" mt="30" display="flex" flexDirection="column">
      <Heading alignSelf="center" size="lg" mb="10">Update your account</Heading>
      
      <ProfileForm />
    </Container>
  )
}

export default ProfilePage;