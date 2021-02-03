import { Component } from "react";
import { Heading, Container, Spinner } from "@chakra-ui/react";

import ProfileForm from "./components/ProfileForm";
import { GetUserProfile } from "../../models/GetUserProfile";
import { UserLocalStore } from "../../services/cache/UserLocalStore";
import { AuthenticatedUser } from "../../models/AuthenticatedUser";
import { User } from "../../models/User";

type ProfilePageProps = {
  loader: GetUserProfile;
  cache: UserLocalStore
}

type ProfilePageState = {
  isLoading: boolean
  loadedUser: User | null
}

class ProfilePage extends Component<ProfilePageProps, ProfilePageState> {
  constructor(props: ProfilePageProps) {
    super(props)

    this.state = {
      isLoading: false,
      loadedUser: null,
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
      const updatedUser: AuthenticatedUser = {
        user: { ...apiUser },
        token: currentUser.token
      }
      cache.insert(updatedUser)
      this.setState({ isLoading: false, loadedUser: updatedUser.user })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { isLoading, loadedUser } = this.state;

    const initialFormValues = {
      email: loadedUser?.email || "",
      first_name: loadedUser?.first_name || "",
      last_name: loadedUser?.last_name || "",
    }

    return (
      <Container border="1px solid" borderColor="gray.300" padding="10" borderRadius="lg" mt="30" display="flex" flexDirection="column">
        <Heading alignSelf="center" size="lg" mb="10">Update your account</Heading>
        
        {isLoading ? (
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        ) : (
          <ProfileForm initialValues={initialFormValues} />
        )}
      </Container>
    )
  }
}

export default ProfilePage;