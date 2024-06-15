import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

import { Container, ContentContainer } from '@/components';
import Header from '@/features/HomePage/Header';

export default function Guides() {
	return (
		<Container>
			<Head>
				<title>Peakee | Privacy Policy</title>
			</Head>
			<Header />

			<CustomContentContainer>
				<Title>Privacy Policy</Title>

				<Text>
					This privacy policy (“Policy”) describes how Peakee Labs.
					(“Company”, “we”, “our”, or “us”) collects, uses, shares,
					and stores personal information of users of its websites,{' '}
					<Link style={{ color: 'blue' }} href={'https://peakee.co'}>
						https://peakee.co
					</Link>{' '}
					and{' '}
					<Link
						style={{ color: 'blue' }}
						href={'https://app.peakee.co'}
					>
						https://app.peakee.co
					</Link>{' '}
					(the “Sites”). This Policy applies to the Sites,
					applications, products and services (collectively,
					“Services”) on or in which it is posted, linked, or
					referenced.
				</Text>
				<Text>
					By using the Services, you accept the terms of this Policy
					and our Terms of Use, and consent to our collection, use,
					disclosure, and retention of your information as described
					in this Policy. If you have not done so already, please also
					review our terms of use. The terms of use contain provisions
					that limit our liability to you and require you to resolve
					any dispute with us on an individual basis and not as part
					of any class or representative action. IF YOU DO NOT AGREE
					WITH ANY PART OF THIS PRIVACY POLICY OR OUR TERMS OF USE,
					THEN PLEASE DO NOT USE ANY OF THE SERVICES.
				</Text>

				<Title>WHAT WE COLLECT</Title>
				<Text>
					We get information about you in a range of ways. Information
					You Give Us. Information we collect from you may include:
				</Text>

				<Li>
					Identity information, such as your first name, last name,
					username or similar identifier, title, date of birth and
					gender;
				</Li>
				<Li>
					Contact information, such as your postal address, email
					address and telephone number;
				</Li>
				<Li>
					Profile information, such as your username and password,
					interests, preferences, feedback and survey responses;
				</Li>
				<Li>
					Transaction information, such details about purchases you
					make through the Service and billing details;
				</Li>
				<Li>
					Usage information, such as information about how you use the
					Service and interact with us;
				</Li>
				<Li>
					Marketing information, such as your preferences for
					receiving marketing communications and details about how you
					engage with them;
				</Li>

				<Text>
					Information We Get From Others. We may get information about
					you from other third party sources and we may add this to
					information we get from your use of the Services. Such
					information may include:
				</Text>

				<Li>
					Registration using Single Sign-On Account: When registering
					some user accounts, you also have the option of using a
					single sign-on account (“SSO”). With an SSO, you can sign up
					for various different services and platforms with a single
					account. Some of our Sites currently offer you the
					opportunity to use the SSO services offered by Google, LLC,
					Amphitheatre Parkway, Mountain View, CA 94043, USA
					(“Google”). Google’s Privacy Policy and Terms of Use apply
					to the registration and use of the Google SSO service, see{' '}
					<Link
						style={{ color: 'blue' }}
						href={'https://policies.google.com/privacy'}
					>
						https://policies.google.com/privacy
					</Link>
					. Please note that the registration for and the use of SSO
					services are subject to the Google privacy policy and terms
					of use, which are beyond our control.
				</Li>

				<Text>
					Information Automatically Collected. We may automatically
					record certain information about how you use our Sites (we
					refer to this information as “Log Data“). Log Data may
					include information such as a user’s Internet Protocol (IP)
					address, device and browser type, operating system, the
					pages or features of our Sites to which a user browsed and
					the time spent on those pages or features, the frequency
					with which the Sites are used by a user, search terms, the
					links on our Sites that a user clicked on or used, and other
					statistics. We use this information to administer the
					Service and we analyze (and may engage third parties to
					analyze) this information to improve and enhance the Service
					by expanding its features and functionality and tailoring it
					to our users’ needs and preferences.
				</Text>

				<Title>USE OF PERSONAL INFORMATION</Title>
				<Text>
					We will use your personal information in the following ways:
				</Text>

				<Li>To enable you to access and use the Services</Li>
				<Li>
					To provide and deliver products and services that you may
					request.
				</Li>
				<Li>
					To process and complete transactions, and send you related
					information, including purchase confirmations and invoices
				</Li>
				<Li>
					To send information, including confirmations, technical
					notices, updates, security alerts, and support and
					administrative messages.
				</Li>

				<SubTitle>To communicate with you</SubTitle>
				<Text>
					We use your personal information to communicate about
					promotions, upcoming events, and other news about products
					and services offered by us and our selected partners.
				</Text>
				<SubTitle>To optimize our platform</SubTitle>
				<Text>
					In order to optimize your user experience, we may use your
					personal information to operate, maintain, and improve our
					Services. We may also use your information to respond to
					your comments and questions regarding the Services, and to
					provide you and other users with general customer service.
				</Text>
				<SubTitle>
					For compliance, fraud prevention, and safety
				</SubTitle>
				<Text>
					We may use your personal information to protect,
					investigate, and deter against fraudulent, unauthorized, or
					illegal activity.
				</Text>

				<Title>SHARING OF PERSONAL INFORMATION</Title>
				<Text>
					We do not share the personal information that you provide us
					with other organizations without your express consent,
					except as described in this Privacy Policy. We disclose
					personal information to third parties under the following
					circumstances:
				</Text>
				<Text>
					Affiliates. We may disclose your personal information to our
					subsidiaries and corporate affiliates (i.e. our family of
					companies that are related by common ownership or control)
					for purposes consistent with this Privacy Policy.
				</Text>
				<Text>
					Business Transfers. We may share personal information when
					we do a business deal, or negotiate a business deal,
					involving the sale or transfer of all or a part of our
					business or assets. These deals can include any merger,
					financing, acquisition, or bankruptcy transaction or
					proceeding.
				</Text>
				<Text>
					Compliance with Laws and Law Enforcement; Protection and
					Safety. We may share personal information for legal,
					protection, and safety purposes.
				</Text>

				<Li>
					We may share information to comply with laws, including KYC
					and AML requirements.
				</Li>
				<Li>
					We may share information to respond to lawful requests and
					legal processes.
				</Li>
				<Li>
					We may share information to protect the rights and property
					of the Company, our agents, customers, and others. This
					includes enforcing our agreements, policies, and terms of
					use.
				</Li>
				<Li>
					We may share information in an emergency. This includes
					protecting the safety of our employees and agents, our
					customers, or any person.
				</Li>
				<Text>
					Professional Advisors and Service Providers. We may share
					information with those who need it to do work for us. These
					recipients may include third party companies and individuals
					to administer and provide the Service on our behalf (such as
					bill and credit card payment processing, customer support,
					hosting, email delivery and database management services),
					as well as lawyers, bankers, auditors, and insurers.
				</Text>
				<Text>
					Other. You may permit us to share your personal information
					with other companies or entities of your choosing. Those
					uses will be subject to the privacy policies of the
					recipient entity or entities.
				</Text>
				<Text>
					We may also share aggregated and/or anonymized data with
					others for their own uses.
				</Text>

				<Title>HOW INFORMATION IS SECURED</Title>
				<Text>
					We retain information we collect as long as it is necessary
					and relevant to fulfill the purposes outlined in this
					privacy policy. In addition, we retain personal information
					to comply with applicable law where required, prevent fraud,
					resolve disputes, troubleshoot problems, assist with any
					investigation, enforce our Terms of Use, and other actions
					permitted by law. To determine the appropriate retention
					period for personal information, we consider the amount,
					nature, and sensitivity of the personal information, the
					potential risk of harm from unauthorized use or disclosure
					of your personal information, the purposes for which we
					process your personal information and whether we can achieve
					those purposes through other means, and the applicable legal
					requirements.
				</Text>
				<Text>
					In some circumstances we may anonymize your personal
					information (so that it can no longer be associated with
					you) in which case we may use this information indefinitely
					without further notice to you.
				</Text>
				<Text>
					We employ industry standard security measures designed to
					protect the security of all information submitted through
					the Services. However, the security of information
					transmitted through the internet can never be guaranteed. We
					are not responsible for any interception or interruption of
					any communications through the internet or for changes to or
					losses of data. Users of the Services are responsible for
					maintaining the security of any password, biometrics, user
					ID or other form of authentication involved in obtaining
					access to password protected or secure areas of any of our
					digital services. In order to protect you and your data, we
					may suspend your use of any of the Services, without notice,
					pending an investigation, if any breach of security is
					suspected.
				</Text>

				<Title>INFORMATION CHOICES AND CHANGES</Title>
				<Text>
					You may request access, a copy, modification or deletion of
					personal information that you have submitted to us by
					contacting us at{' '}
					<Link
						style={{ color: 'blue' }}
						href={'mailto:admin@peakee.co'}
					>
						admin@peakee.co
					</Link>{' '}
					. We will use reasonable efforts to accommodate such
					requests to the extent required by law, provided that we may
					be required to retain personal information to comply with
					legal obligations, accounting requirements, or for other
					business purposes. We may request additional information to
					verify the identity of the requesting party before
					responding to a request. Please note that copies of
					information that you have updated, modified or deleted may
					remain viewable in cached and archived pages of the Site for
					a period of time.
				</Text>

				<Title>ELIGIBILITY</Title>
				<Text>
					If you are under the age of majority in your jurisdiction of
					residence, you may use the Services only with the consent of
					or under the supervision of your parent or legal guardian.
					Consistent with the requirements of the Children’s Online
					Privacy Protection Act (COPPA), if we learn that we have
					received any information directly from a child under age 13
					without first receiving his or her parent’s verified
					consent, we will use that information only to respond
					directly to that child (or his or her parent or legal
					guardian) to inform the child that he or she cannot use the
					Sites and subsequently we will delete that information.
				</Text>

				<Title>MARKETING COMMUNICATIONS AND SHARING</Title>
				<Text>
					You may instruct us not to use your contact information to
					contact you regarding services, promotions, surveys and
					special events that might appeal to your interests by
					contacting us using the information below. You can also opt
					out by following the instructions located at the bottom of
					any commercial emails messages you may receive.
				</Text>
				<Text>
					Please note that, regardless of your request, we may still
					use and share certain information as permitted by applicable
					law. For example, you may not opt out of certain operational
					emails, such as those reflecting our relationship or
					transactions with you, or important notifications regarding
					the Services we are providing to you, such as
					service-related announcements (e.g., if our Services are
					temporarily suspended for maintenance).
				</Text>
				<Text>
					Or, if you have downloaded our mobile application and
					enabled push notifications on your mobile device, we may
					send you alerts and notifications through push
					notifications, for example, to communicate status updates on
					our Services. However, you may choose to disable these
					notifications (except for the initial notification intended
					to verify your identity).
				</Text>

				<Title>THIRD PARTY LINKS AND WEBSITES</Title>
				<Text>
					This Privacy Notice does not address, and we are not
					responsible for, the privacy practices of any third parties,
					including those that operate websites to which our Sites
					link. The inclusion of a link on our Sites does not imply
					that we or our affiliates endorse the practices of the
					linked website.
				</Text>

				<Title>CO-BRANDED WEBSITES</Title>
				<Text>
					In the event that our Sites link to other websites that
					include our branding, this Privacy Notice does not apply to
					those other websites. Visitors to those websites are advised
					to carefully read the notices on those individual websites.
				</Text>

				<Title>CHANGES TO THIS PRIVACY POLICY</Title>
				<Text>
					We may change this privacy policy at any time. We encourage
					you to periodically review this page for the latest
					information on our privacy practices. If we make any
					changes, we will change the Last Updated date above.
				</Text>
				<Text>
					Any modifications to this Privacy Policy will be effective
					upon our posting of the new terms and/or upon implementation
					of the changes to the Sites (or as otherwise indicated at
					the time of posting). In all cases, your continued use of
					the Sites or Services after the posting of any modified
					Privacy Policy indicates your acceptance of the terms of the
					modified Privacy Policy.
				</Text>

				<Title>CONTACT US</Title>
				<Text>
					We welcome your comments or questions about this Policy, and
					you may contact us at:{' '}
					<Link
						style={{ color: 'blue' }}
						href={'mailto:admin@peakee.co'}
					>
						admin@peakee.co
					</Link>
				</Text>
			</CustomContentContainer>
		</Container>
	);
}

const Title = styled.h1`
	margin-top: 30px;
	margin-bottom: 10px;
`;

const SubTitle = styled.h3`
	margin-top: 20px;
	margin-bottom: 4px;
`;

const Text = styled.p`
	font-size: 14px;
	margin-top: 14px;
	margin-bottom: 6px;
	line-height: 24px;
`;

const Li = styled.li`
	margin-left: 10px;
	font-size: 14px;
	line-height: 24px;
	color: '#3a3a3a';
`;

const CustomContentContainer = styled(ContentContainer)`
	max-width: 780px;
	margin-top: 28px;
	padding-bottom: 200px;
`;
