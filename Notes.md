# Zoom
A full stack video conferencing web application.

# general knowlege on connections
## connection between client and server(Socket Programming)
- client makes a request to the server
- server processes the request and sends a response back to the client
- connection take place by knowing the IP address and port number of the server (i.e sockets)
- client and server communicate using protocols like HTTP/HTTPS, WebSocket, etc.

## protocols
- **TCP (Transmission Control Protocol)**: reliable, connection-oriented protocol used for most internet communication.
- **UDP (User Datagram Protocol)**: faster, connectionless protocol used for real-time applications like video streaming and online gaming.
- **HTTP (Hypertext Transfer Protocol)**: protocol used for web communication, built on top of TCP.

# WebRTC
- **WebRTC (Web Real-Time Communication)**: a protocol that enables peer-to-peer communication between web browsers bidirectionally for `real-time audio, video, and data sharing`.

- without WebRTC, video conferencing applications would have to rely on a server to relay the audio and video streams between participants, which can introduce latency and reduce the quality of the communication.

## how WebRTC works
1. **Signaling**: Before a WebRTC connection can be established, the two peers need to exchange information about how to connect to each other.
2. **Connecting**: Once the signaling information has been exchanged, the two peers can establish a direct connection using a process called ICE (Interactive Connectivity Establishment). ICE uses a combination of STUN (Session Traversal Utilities for NAT) and TURN (Traversal Using Relays around NAT) servers to help the peers find each other and establish a connection.
3. **Securing**: WebRTC uses DTLS (Datagram Transport Layer Security) to encrypt the audio and video streams, ensuring that the communication is secure and private, and SRTP (Secure Real-time Transport Protocol) to provide encryption, message authentication, and integrity, and replay protection to the RTP data in WebRTC.
4. **Communicating**: Once the connection is established and secured, the two peers can start sending audio, video, and data streams to each other in real-time. It uses RTP (Real-time Transport Protocol) to transmit audio and video data between peers and SCTP (Stream Control Transmission Protocol) for data channels.

conclusion: WebRTC does the above things in the background, allowing developers to focus on building their applications without worrying about the underlying complexities of real-time communication.

## WWebRTC components
1. **MediaStream**: represents a stream of media content, such as audio or video, that can be sent or received over a WebRTC connection.
2. **RTCPeerConnection**: represents a connection between two peers that can be used to send and receive audio, video, and data streams.
3. **RTCDataChannel**: represents a bidirectional data channel that can be used to send and receive arbitrary data between two peers.

# WebRTC Architecture
1. **P2P (Peer-to-Peer) Architecture**: WebRTC uses a P2P architecture, which means that the audio, video, and data streams are sent directly between the two peers without the need for a central server to relay the communication.
- limits: NAT traversal issues, scalability issues, security concerns, as more peers join the network, the complexity of managing the connections increases,
 if any peer has a poor network connection, it can affect the quality of the communication for all peers.
- when to use P2P: small group communication, low latency applications, privacy and security.

2. **SFU (Selective Forwarding Unit) Architecture**: In this architecture, a central server (the SFU) receives the audio and video streams from each peer and selectively forwards them to the other peers in the conference.
- pros: scalability, better handling of NAT traversal issues, improved security.
- cons: increased latency, single point of failure, higher server costs, more request to server, if any peer has a poor network connection, it can affect the quality of the communication for all peers.
- when to use SFU: large group communication, heterogeneous network conditions, recording and broadcasting.

3. **MCU (Multipoint Control Unit) Architecture**: In this architecture, a central server (the MCU) receives the audio and video streams from each peer, mixes them together, and then sends a single mixed stream back to each peer.
- pros: simplified client architecture, better handling of heterogeneous network conditions, improved security.
- cons: increased latency, single point of failure, higher server costs, more request to server, if any peer has a poor network connection, it can affect the quality of the communication for all peers.
- when to use MCU: large group communication, heterogeneous network conditions, recording and broadcasting.

```
what architecture does Zoom use?
Zoom uses a combination of SFU and MCU architectures to provide a scalable and reliable video conferencing experience.
but we use P2P architecture for our zoom clone.
```

### table of differences
| Feature               | P2P Architecture                     | SFU Architecture                     | MCU Architecture                     |
|-----------------------|-------------------------------------|-------------------------------------|-------------------------------------|
| Scalability           | Limited scalability                 | Highly scalable                     | Limited scalability                 |
| Latency               | Low latency                         | Higher latency                      | Highest latency                     |
| Server costs          | No server costs                     | Higher server costs                 | Highest server costs                |
| Complexity            | More complex client-side            | More complex server-side            | Most complex server-side            |
| Use cases             | Small group calls                   | Large group calls                   | Large group calls                   |
