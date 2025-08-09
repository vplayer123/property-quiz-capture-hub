
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Download, Save, Users, FileText, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContentData {
  step1_title: string;
  step1_subtitle: string;
  step2_title: string;
  step2_subtitle: string;
  step3_title: string;
  step3_subtitle: string;
  step4_title: string;
  step4_subtitle: string;
  step5_title: string;
  step5_subtitle: string;
}

interface Submission {
  id: number;
  address: string;
  propertyType: string;
  budget: string;
  bedrooms: string;
  bathrooms: string;
  propertySize: string;
  amenities: string;
  timeline: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const [content, setContent] = useState<ContentData>({
    step1_title: '',
    step1_subtitle: '',
    step2_title: '',
    step2_subtitle: '',
    step3_title: '',
    step3_subtitle: '',
    step4_title: '',
    step4_subtitle: '',
    step5_title: '',
    step5_subtitle: ''
  });
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchContent();
    fetchSubmissions();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('./api/get-content.php');
      const data = await response.json();
      if (data.success && data.content) {
        setContent(data.content);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('./api/get-submissions.php');
      const data = await response.json();
      if (data.success) {
        setSubmissions(data.submissions || []);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async () => {
    setSaving(true);
    try {
      const response = await fetch('./api/update-content.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content)
      });
      
      const result = await response.json();
      if (result.success) {
        toast({
          title: "Success",
          description: "Content updated successfully!",
        });
      } else {
        throw new Error(result.message || 'Failed to update content');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const exportCSV = () => {
    window.open('./api/export-csv.php', '_blank');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your property quiz application</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{submissions.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {submissions.filter(s => new Date(s.createdAt).getMonth() === new Date().getMonth()).length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Most Popular Type</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {submissions.length > 0 ? 
                  submissions.reduce((a, b) => 
                    submissions.filter(s => s.propertyType === a.propertyType).length > 
                    submissions.filter(s => s.propertyType === b.propertyType).length ? a : b
                  ).propertyType || 'N/A' : 'N/A'}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content">Content Management</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quiz Content</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Edit the titles and subtitles for each step of the quiz
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div key={step} className="space-y-4 p-4 border rounded-lg">
                    <h3 className="text-lg font-semibold">Step {step}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`step${step}_title`}>Title</Label>
                        <Input
                          id={`step${step}_title`}
                          value={content[`step${step}_title` as keyof ContentData]}
                          onChange={(e) => setContent({
                            ...content,
                            [`step${step}_title`]: e.target.value
                          })}
                          placeholder={`Step ${step} title`}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`step${step}_subtitle`}>Subtitle</Label>
                        <Textarea
                          id={`step${step}_subtitle`}
                          value={content[`step${step}_subtitle` as keyof ContentData]}
                          onChange={(e) => setContent({
                            ...content,
                            [`step${step}_subtitle`]: e.target.value
                          })}
                          placeholder={`Step ${step} subtitle`}
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-end">
                  <Button onClick={saveContent} disabled={saving} className="px-6">
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="submissions" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Quiz Submissions</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    View and export all quiz submissions
                  </p>
                </div>
                <Button onClick={exportCSV} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {submissions.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No submissions yet</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Date</th>
                            <th className="text-left p-2">Contact</th>
                            <th className="text-left p-2">Location</th>
                            <th className="text-left p-2">Type</th>
                            <th className="text-left p-2">Budget</th>
                            <th className="text-left p-2">Timeline</th>
                          </tr>
                        </thead>
                        <tbody>
                          {submissions.map((submission) => (
                            <tr key={submission.id} className="border-b hover:bg-muted/50">
                              <td className="p-2">
                                {new Date(submission.createdAt).toLocaleDateString()}
                              </td>
                              <td className="p-2">
                                <div>
                                  <p className="font-medium">{submission.contactName}</p>
                                  <p className="text-sm text-muted-foreground">{submission.contactEmail}</p>
                                </div>
                              </td>
                              <td className="p-2 max-w-xs truncate">{submission.address}</td>
                              <td className="p-2">
                                <Badge variant="secondary">{submission.propertyType}</Badge>
                              </td>
                              <td className="p-2">{submission.budget}</td>
                              <td className="p-2">{submission.timeline}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
