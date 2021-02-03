import { Component } from "react";
import { Heading, Container } from "@chakra-ui/react";

import ProfileForm from "./components/ProfileForm";
import { GetUserProfile } from "../../models/GetUserProfile";
import { UserLocalStore } from "../../services/cache/UserLocalStore";
import { AuthenticatedUser } from "../../models/AuthenticatedUser";

type ProfilePageProps = {
  loader: GetUserProfile;
  cache: UserLocalStore
}

type ProfilePageState = {
  isLoading: boolean
}

class ProfilePage extends Component<ProfilePageProps, ProfilePageState> {
  constructor(props: ProfilePageProps) {
    super(props)

    this.state = {
      isLoading: false
    }
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true }, async () => await this.loadUser());
  }

  loadUser = async () => {
    const { loader, cache } = this.props
    const currentUser = cache.retrieve()!

    try {
      const apiUser = await loader.find(currentUser.user.email!)
      const upatedUser: AuthenticatedUser = {
        user: { ...apiUser },
        token: currentUser.token
      }
      cache.insert(upatedUser)
    } catch {
      console.log("error")
    }
  }

  render() {
    return (
      <Container border="1px solid" borderColor="gray.300" padding="10" borderRadius="lg" mt="30" display="flex" flexDirection="column">
        <Heading alignSelf="center" size="lg" mb="10">Update your account</Heading>
        
        <ProfileForm />
      </Container>
    )
  }
}

export default ProfilePage;